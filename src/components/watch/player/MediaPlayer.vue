<template>
  <q-page-container class="media-container" >
          <vue-plyr ref="mediaPlayer" class='vue-plyr-container'>
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
    <!-- <button is="google-cast-button" id="cast">Cast</button> -->
   
    <!-- <pan-zoom> -->
        <!-- <player-controls :currentTime="ctime" >
      <template #slider>
        <media-progress-slider
          :ctime="ctime"
        />
      </template>
    </player-controls> -->
  </q-page-container>
</template>

<script>
import { utilities } from "../../../mixins/utilities";
import { mapState, mapActions} from "vuex";
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
    ctime: 0,
    pzOptions: {
      minZoom: 1,
      maxZoom: 4,
      bounds: true,
      boundsPadding: 0.1
    },
    zoom: null,
  }),
  created() {
    this.$root.$on("slider-change", this.seekTo);
    this.$root.$on("togglePlay", this.togglePlay);
    this.$root.$on("restart", this.restart);
    this.$root.$on("seek5", this.seekTo);
    this.$root.$on("seek-5", this.seekTo);
    this.$root.$on("loopStart", this.setloopStart);
    this.$root.$on("loopStop", this.setloopStop);
    // this.$root.$on("toggleLooping", this.toggleLooping);
    this.$root.$on("speed", this.speedChange);
    this.$root.$on("volume", this.volumeChange);
    this.$root.$on("zoom", this.toggleZoom);
    this.$root.$on("resetZoom", this.resetZoom);
    this.$root.$on("clear-loop", this.clearLoop);
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
      this.loadDefaultSettings();
      this.player.toggleControls(false);
    });
    this.player.on("timeupdate", this.timeUpdated);
    this.player.on("clear-loop", this.clearLoop);
    this.player.on("playing play pause", this.stateChange);
  },
  watch: {
    looping() {
      console.log("looptoggle");
      if (this.$store.getters["watch/isValidLoop"])
        this.setCurrentTime(this.start);
        console.log(`toggling looping: ${this.looping ? 'on' : 'off'}`)
      this.player.togglePlay(this.looping);
      this.showMessage({
        type: "info",
        caption: this.looping
          ? `Start: ${this.secondsToMinutes(
              this.start
            )} -> End: ${this.secondsToMinutes(this.stop)}`
          : this.secondsToMinutes(this.player.currentTime),
        message: this.looping ? "Loop Active" : "Loop Stopped",
        icon: this.loopIcon
      });
    },
    ctime() {
      this.$root.$emit('ctime-update', this.ctime)
    }
  },
  computed: {
    ...mapState("watch", {
      start: state => state.playerSettings.loop_start,
      stop: state => state.playerSettings.loop_stop,
      isPlaying: state => state.playerSettings.playing,
      looping: state => state.playerSettings.looping,
      duration: state => state.playerSettings.duration,
      seekToTime: state => state.seekToTime
    }),
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
    }
  },
  methods: {
    ...mapActions("watch", ["flipPlayer", "loadPlayerSettings"]),
    setCurrentTime(val) {
      this.player.currentTime = val;
    },
    clearLoop() {
      // this.loopObjx = null;
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
      this.$store.commit('watch/SET_SEGMENT_DURATION',  this.player.duration);
      this.ctime = this.player.currentTime;
      if (this.looping) {
        if (this.ctime >= this.stop) {
          this.seekTo(this.start);
          this.showMessage({
            message: "Loop Rewound",
            caption:
              this.secondsToMinutes(this.ctime) +
              " >> " +
              this.secondsToMinutes(this.stop)
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
    togglePlay() {
      if (!this.player) return;
      if (this.player.playing) {
        this.player.pause();
      } else {
        this.player.play();
      }
      this.$store.commit('watch/TOGGLE_PLAYING', this.player.playing)
      console.log("isisPlaying?: ", this.isPlaying);
    },
    setloopStart(time) {
      this.$store.dispatch("watch/setLoopStart", time).then(() => {
        this.showMessage(
          Object.assign({}, this.cfgLoopIcon, {
            type: "positive",
            message: "Loop Start Set",
            caption: this.secondsToMinutes(this.start)
          })
        );
      });
    },
    setloopStop(time) {
      this.$store.dispatch("watch/setLoopStop", time).then(info => {
        var caption = {};
        if (this.stop > 0) caption = { caption: this.secondsToMinutes(this.stop) };
        this.showMessage(Object.assign({}, this.cfgLoopIcon, info, caption));
      });
    },
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

.media-container {
  position: relative;
  width: 100%;
  height: 100%;
  
}
.vue-plyr-container {
  padding-bottom: 39%;
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
