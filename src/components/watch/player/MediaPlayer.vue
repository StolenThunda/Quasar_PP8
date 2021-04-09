<template>
  <div class="column justify-between">
    <!-- <pan-zoom> -->
    <vue-plyr ref="mediaPlayer">
      <!-- Begin Audio Interface -->
      <video
        v-if="this.type == 'audio'"
        id="mediaPlayer"
        ref="mediaPlayer"
        :playsinline="playsinline"
        :controls="controls"
        :data-poster="poster"
      >
        <source
          v-for="source in sources"
          :key="source.src"
          :src="cdn_url + '/' + id"
          :type="source.type"
        />
      </video>
      <!-- End Audio Interface -->

      <!-- Begin Video Interface -->
      <video
        v-else
        id="mediaPlayer"
        ref="mediaPlayer"
        :playsinline="playsinline"
        :controls="controls"
        :data-poster="poster"
      >
        <source
          v-for="source in sources"
          :key="source.src"
          :src="source.src"
          :type="source.type"
          :size="source.size"
        />
      </video>
      <!-- End Video Interface -->
    </vue-plyr>
    <!-- </pan-zoom> -->
    <player-controls
      :currentTime="ctime"
      :isPlaying="playing"
      :isLoopDefined="validLoop"
      :loopStart="loopStart"
      :loopStop="loopStop"
    >
      <template #slider>
        <media-progress-slider
          :remaining="duration"
          :ctime="ctime"
          :activeLoop="loopObj"
        />
      </template>
    </player-controls>
  </div>
</template>

<script>
import { utilities } from "../../../mixins/utilities";
import { mapState, mapActions } from "vuex";
// Vue.use(panZoom);
export default {
  name: "PlyerMediaPlayer",
  inheritAttrs: false,
  mixins: [utilities],
  props: {
    flipped: Boolean,
    controls: Boolean,
    poster: String,
    sources: Array,
    allowfullscreen: Boolean,
    color: String,
    title: String,
    id: String,
    to: String,
    type: String,
    playsinline: Boolean,
    "webkit-playsinline": Boolean,
    preload: [String, Boolean],
    cdn_url: String
  },
  data: () => ({
    duration: 1000,
    ctime: 0,
    loopStart: null,
    loopStop: null,
    pzOptions: {
      minZoom: 1,
      maxZoom: 4,
      bounds: true,
      boundsPadding: 0.1
    },
    zoom: null,
    playing: false,
    loopActive: false,
    loopObj: null
  }),
  created() {
    this.$root.$on("slider-change", this.seekTo);
    this.$root.$on("togglePlay", this.togglePlay);
    this.$root.$on("restart", this.restart);
    this.$root.$on("seek5", this.seekTo);
    this.$root.$on("seek-5", this.seekTo);
    this.$root.$on("loopStart", this.setloopStart);
    this.$root.$on("loopStop", this.setloopStop);
    this.$root.$on("toggleLooping", this.toggleLooping);
    this.$root.$on("speed", this.speedChange);
    this.$root.$on("volume", this.volumeChange);
    this.$root.$on("zoom", this.toggleZoom);
    this.$root.$on("resetZoom", this.resetZoom);
    this.$root.$on("clear-loop", this.clearLoop);
    this.$root.$on("set-loop", this.setLoopWithObject);
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === "watch/SET_SEEK_TIME") {
        this.seekTo(state.watch.seekToTime);
        this.player?.play();
      }
    });
  },
  beforeDestroy() {
    this.unsubscribe();
  },
  mounted() {
    this.player.on("ready", e => {
      this.duration = e.detail.plyr.duration;
      this.loadDefaultSettings();
      this.player.toggleControls(false);
    });
    this.player.on("timeupdate", this.timeUpdated);
    this.player.on("clear-loop", this.clearLoop);
    this.player.on("playing play pause", this.stateChange);
  },
  components: {
    "media-progress-slider": () =>
      import("src/components/watch/player/MediaProgressSlider.vue"),
    "player-controls": () =>
      import("src/components/watch/player/PlayerControls.vue")
  },
  watch: {
    playing(e) {
      this.playing = e;
    },
    validLoop: function(valid) {
      this.loopObj = this.loopActive
        ? { min: this.loopStart, max: this.loopStop }
        : null;
      if (valid) {
        this.$root.$emit("valid-loop", {
          status: this.validLoop,
          loop: this.loopObj
        });
      } else {
        this.$root.$emit("valid-loop", { status: this.validLoop });
      }
    }
  },
  computed: {
    ...mapState("watch", ["playerSettings", "seekToTime"]),
    divPlayer() {
      return ["youtube", "vimeo"].includes(this.type);
    },
    player() {
      return this.$refs.mediaPlayer.player;
    },
    vimeoPlayer() {
      // return `https://player.vimeo.com/video/${this.sources[0].src}?loop=false&amp;byline=false&amp;portrait=false&amp;title=false&amp;speed=true&amp;transparent=0&amp;gesture=media`;
      return `${this.sources[0].src}`;
    },
    youtubePlayer() {
      // return `http://www.youtube.com/embed/${this.sources[0].src}?rel=0&hd=1 `;
      return `https://www.youtube.com/embed/${this.sources[0].src}?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&controls=0&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1`;
    },
    validLoop() {
      const isValid =
        typeof this.loopStart === "number" &&
        typeof this.loopStop === "number" &&
        this.loopStart !== this.loopStop &&
        this.loopStop - this.loopStart > 1;
      if (isValid) this.$root.$emit("valid-loop", isValid);
      return isValid;
    }
  },
  methods: {
    ...mapActions("watch", ["flipPlayer", "loadPlayerSettings"]),
    setLoopWithObject(loop) {
      console.log("loop /w obj", loop);
      const startTime = loop[1];
      const endTime = loop[2];
      this.setloopStart(startTime);
      this.setloopStop(endTime);
    },
    setCurrentTime(val) {
      this.player.currentTime = val;
    },
    clearLoop() {
      this.loopStart = null;
      this.loopStop = null;
      this.loopObj = null;
      this.loopActive = false;
      this.$root.$emit("loop-cleared");
      console.log("loop cleared");
    },
    pzInit(pz_instance) {
      console.log("pz", pz_instance);
      this.pz = pz_instance;
      this.pz.originalScale = this.pz.getTransform();
      this.pz.pause();
      this.pz.on("panstart", e => {
        console.log(e);
      });
    },
    toggleZoom(e) {
      if (this.pz.isPaused()) {
        this.pz.resume();
      } else {
        this.pz.pause();
      }
      console.log(`pz is: ${this.pz.isPaused() ? "paused" : "unpaused"}`);
    },
    resetZoom(e) {
      this.pz.smoothMoveTo(0, 0, 1);
      this.pz.smoothZoomAbs(0, 0, 1);
    },
    loadDefaultSettings() {
      const settings = {
        speed: this.player.speed * 100,
        volume: this.player.volume * 100
      };
      this.loadPlayerSettings(settings);
    },
    volumeChange(val) {
      this.player.volume = val / 100;
    },
    speedChange(val) {
      this.player.speed = val / 100;
    },
    timeUpdated: function(e) {
      this.duration = this.player.duration;
      this.ctime = this.player.currentTime;
      if (this.loopActive) {
        if (this.ctime >= this.loopStop) {
          this.seekTo(this.loopStart);
          this.showMessage({
            message: "Loop Rewound",
            caption:
              this.secondsToMinutes(this.ctime) +
              " >> " +
              this.secondsToMinutes(this.loopStop)
          });
        }
      }
    },
    seekTo(time) {
      if (!this.player || typeof time == NaN) return;
      let val = time >= 0 ? time : 0;
      console.log("Seek to time ", time);
      this.ctime = this.setCurrentTime(val);
    },
    restart() {
      this.seekTo(0);
    },
    stateChange(e) {
      const state = e.type;
      this.playing = state !== "pause";
      // console.log(state, this.playing);
    },
    togglePlay() {
      if (!this.player) return;
      if (this.player.playing) {
        this.player.pause();
      } else {
        this.player.play();
      }
      console.log("playing?: ", this.player.playing);
    },
    setloopStart(time) {
      if (!this.player) return;
      if (!this.player.currentTime) return;
      if (typeof this.player?.currentTime === NaN) return;
      const current = time ? time : this.player.currentTime;
      this.loopStart = current;
      if (this.loopStop <= current) this.loopStop = null;
      this.$store.commit("watch/SET_LOOP_START", this.loopStart);
      this.showMessage(
        Object.assign({}, this.cfgLoopIcon, {
          type: "positive",
          message: "Loop Start Set",
          caption: this.secondsToMinutes(this.loopStart)
        })
      );
    },
    setloopStop(time) {
      if (!this.player) return;
      if (!this.player.currentTime) return;
      if (typeof this.player.currentTime === NaN) return;
      const current = time ? time : this.player.currentTime;
      console.log("curr", this.secondsToMinutes(current));
      if (typeof this.loopStart === "number") {
        if (this.loopStart !== current) {
          if (this.loopStart < current) {
            this.loopStop = current;
            this.$store.commit("watch/SET_LOOP_STOP", this.loopStop);
            this.showMessage(
              Object.assign({}, this.cfgLoopIcon, {
                type: "positive",
                message: "Loop End Set",
                caption: this.secondsToMinutes(this.loopStop)
              })
            );
          } else {
            this.showMessage(
              Object.assign({}, this.cfgLoopInfo, {
                type: "negative",
                message: "Loop end must be greater the loop start!"
              })
            );
          }
        } else {
          this.showMessage(
            Object.assign({}, this.cfgLoopInfo, {
              type: "negative",
              message: "Loop Start and End cannot be equal"
            })
          );
        }
      } else {
        this.showMessage(
          Object.assign({}, this.cfgLoopWarning, {
            type: "info",
            message: "Must set loop start first"
          })
        );
      }
    },
    toggleLooping() {
      console.log("looptoggle");
      if (this.validLoop) this.setCurrentTime(this.loopStart);
      this.loopActive = !this.loopActive;

      this.player.togglePlay(this.loopActive);
      this.showMessage({
        type: "info",
        caption: this.loopActive
          ? `Start: ${this.secondsToMinutes(
              this.loopStart
            )} -> End: ${this.secondsToMinutes(this.loopStop)}`
          : this.secondsToMinutes(this.player.currentTime),
        message: this.loopActive ? "Loop Active" : "Loop Stopped",
        icon: this.loopIcon
      });
    }
    // resizeIFrameToFitContent( iFrame ) {
    //   console.log('b-iframe', iFrame)
    //   iFrame.width  = iFrame.contentWindow.parent.document.body.scrollWidth + 'px';
    // iFrame.height = iFrame.contentWindow.parent.document.body.scrollHeight  * .9 + 'px';
    //   console.log('a-iframe', iFrame)
    // }
  }
};
</script>
<style>
@import "https://cdn.plyr.io/3.6.2/plyr.css";

.container {
  position: relative;
  width: 100%;
  height: 0;
  /* padding-bottom: 39%; */
}

.videoWrapper {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(var(--aspect-ratio, 0.35) * 100%);
}

.videoWrapper iframe {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-bottom: calc(var(--aspect-ratio, 0.35) * 100%);
}
.flipped {
  -webkit-transform: rotateY(180deg);
  transform: rotateY(180deg);
}
.plyr__controls {
  opacity: 0;
  pointer-events: none;
  display: none;
}
</style>
