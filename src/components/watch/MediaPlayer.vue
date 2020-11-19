<template>
  <div>
    <!-- <pan-zoom selector> -->
    <plyr-vue v-if="divPlayer" ref="mediaPlayer" v-on="$attrs">
      <!-- class="plyr__video-embed videoWrapper"  -->
      <div class="videoWrapper" id="mediaPlayer">
        <iframe
          :class="{ flipped: this.flipped }"
          v-if="type === 'youtube'"
          :src="youtubePlayer"
          allowfullscreen
          allowtransparency
        />

        <iframe
          v-if="type === 'vimeo'"
          :src="vimeoPlayer"
          allowfullscreen
          allowtransparency
          allow="autoplay"
        />
      </div>
    </plyr-vue>
    <!-- </pan-zoom> -->

    <!-- <pan-zoom> -->
    <plyr-vue v-if="!divPlayer" ref="mediaPlayer">
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
    </plyr-vue>
    <!-- </pan-zoom> -->
    <player-controls
      :currentTime="ctime"
      :isPlaying="playing"
      :isLoopDefined="validLoop"
      :loopStart="loopStart"
      :loopStop="loopStop"
    >
      <template #slider>
        <media-progress-slider :remaining="duration" :ctime="ctime" />
      </template>
    </player-controls>
  </div>
</template>

<script>
import Vue from "vue";
import VuePlyr from "vue-plyr";
import { utilities } from "../../mixins/utilities";
// import panZoom from "vue-panzoom";
Vue.use(VuePlyr);
// Vue.use(panZoom);
const STM = val => utilities.secondsToMinutes(val);
export default {
  name: "PlyerMediaPlayer",
  inheritAttrs: false,
  mixins: [utilities],
  props: {
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
    flipped: false,
    playing: false,
    loopActive: false
  }),
  created() {
    this.$root.$on("flip-player", this.flipPlayer);
    this.$root.$on("slider-change", this.seekTo);
    this.$root.$on("togglePlay", this.togglePlay);
    this.$root.$on("restart", this.restart);
    this.$root.$on("seek5", this.seekTo);
    this.$root.$on("seek-5", this.seekTo);
    this.$root.$on("loopStart", this.setloopStart);
    this.$root.$on("loopStop", this.setloopStop);
    this.$root.$on("toggleLooping", this.toggleLooping);
    this.$root.$on("clearLoop", () => {
      this.loopStop = this.loopStart = null;
    });
  },
  mounted() {
    // this.$nextTick(() => {
    this.player.on("ready", e => {
      this.duration = e.detail.plyr.duration;
    });
    this.player.on("timeupdate", this.timeUpdated);
    this.player.on("playing play pause", this.stateChange);
    // });
  },
  components: {
    "plyr-vue": VuePlyr,
    "media-progress-slider": () =>
      import("components/watch/MediaProgressSlider"),
    "player-controls": () => import("components/watch/PlayerControls")
  },
  watch: {
    playing(e) {
      this.playing = e;
    }
  },
  computed: {
    player() {
      return this.$refs.mediaPlayer.player;
    },
    vimeoPlayer() {
      return `https://player.vimeo.com/video/${this.sources[0].src}?loop=false&amp;byline=false&amp;portrait=false&amp;title=false&amp;speed=true&amp;transparent=0&amp;gesture=media`;
    },
    youtubePlayer() {
      // return `http://www.youtube.com/embed/${this.sources[0].src}?rel=0&hd=1 `;
      return `https://www.youtube.com/embed/${this.sources[0].src}?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1`;
    },
    validLoop() {
      return (
        typeof this.loopStart === "number" &&
        typeof this.loopStop === "number" &&
        this.loopStart !== this.loopStop &&
        this.loopStop - this.loopStart > 1
      );
    }
  },
  methods: {
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
    flipPlayer() {
      this.flipped = !this.flipped;
    },
    divPlayer() {
      const isDivPlayer = this.titletype in ["youtube", "vimeo"];
      console.log("isDivPlay", isDivPlayer);
      return isDivPlayer;
    },
    seekTo(time) {
      // console.log("orig time ", time);
      if (!this.player) return;
      this.ctime = this.player.currentTime = time >= 0 ? time : 0;
    },
    restart() {
      this.seekTo(0);
    },
    stateChange(e) {
      const state = e.type;
      this.playing = state !== "pause";
      // console.log(state, this.playing);
    },
    togglePlay(val) {
      if (!this.player) return;
      if (this.player.playing || !val) {
        this.player.pause();
      } else {
        this.player.play();
      }
    },
    setloopStart() {
      if (!this.player) return;
      const current = this.player.currentTime;
      this.loopStart = current;
      if (this.loopStop <= current) this.loopStop = null;
      this.showMessage(
        Object.assign({}, this.cfgLoopIcon, {
          type: 'positive',
          message: "Loop Start Set",
          caption: this.secondsToMinutes(this.loopStart)
        })
      );
    },
    setloopStop() {
      if (!this.player) return;
      const current = this.player.currentTime;
      if (typeof this.loopStart === "number") {
        if (this.loopStart !== current) {
          this.loopStop = this.player.currentTime;
          this.showMessage(
            Object.assign({}, this.cfgLoopIcon, {
              type: 'positive',
              message: "Loop End Set",
              caption: this.secondsToMinutes(this.loopStop)
            })
          );
        } else {
          this.showMessage(
            Object.assign({}, this.cfgLoopInfo, {
              type: 'negative',
              message: "Loop Start and End cannot be equal"
            })
          );
        }
      } else {
        this.showMessage(
          Object.assign({}, this.cfgLoopWarning, {
            type: 'info',
            message: "Must set loop start first"
          })
        );
      }
    },
    toggleLooping() {
      console.log("looptoggle");
      if (this.validLoop) this.player.currentTime = this.loopStart;
      this.loopActive = !this.loopActive;
      this.player.togglePlay(this.loopActive);
      this.showMessage({
        type: 'info',
        caption: this.loopActive
          ? `Start: ${this.secondsToMinutes(
              this.loopStart
            )} -> End: ${this.secondsToMinutes(this.loopStop)}`
          : this.secondsToMinutes(this.player.currentTime),
        message: this.loopActive ? "Loop Active" : "Loop Stopped",
        icon: this.loopIcon
      });
    }
  }
};
</script>
<style scoped>
@import "https://cdn.plyr.io/3.6.2/plyr.css";
.videoWrapper {
  position: relative;
  height: 0;
  padding-bottom: calc(var(--aspect-ratio, 0.75) * 100%);
}

.videoWrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.flipped {
  -webkit-transform: rotateY(180deg);
  transform: rotateY(180deg);
}
</style>
