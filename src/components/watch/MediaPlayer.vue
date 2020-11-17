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
    <player-controls>
      <template #slider>
        <media-progress-slider :remaining="duration" :ctime="ctime" />
      </template>
    </player-controls>
  </div>
</template>

<script>
import Vue from "vue";
import VuePlyr from "vue-plyr";
// import panZoom from "vue-panzoom";
Vue.use(VuePlyr);
// Vue.use(panZoom);

export default {
  name: "PlyerMediaPlayer",
  inheritAttrs: false,
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
    // isPlaying:  this.player?.playing || false,
    flipped: false
  }),
  created() {
    this.$root.$on("flip-player", this.flipPlayer);
    this.$root.$on("slider-change", this.seekTo);
    this.$root.$on("pause", this.pausePlayer);
  },
  mounted() {
    this.$nextTick(() => {
      this.player.on("ready", e => {
        this.duration = e.detail.plyr.duration;
        console.log("dur", this.duration);
      });
      this.player.on("timeupdate", this.timeUpdated);
      // this.player.on("progress", e => {
      //   console.log("pro", e);
      // });
      this.player.on("loadeddata", e => {
        console.log("loaded");
      });
    });
  },
  // watch: {
  //   ctime() {

  //   }
  // },
  components: {
    "plyr-vue": VuePlyr,
    "media-progress-slider": () =>
      import("components/watch/MediaProgressSlider"),
    "player-controls": () => import("components/watch/PlayerControls")
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
    }
  },

  methods: {
    timeUpdated: function(e) {
      console.log("timeupdated");
      this.duration = this.player.duration;
      this.ctime = this.player.currentTime;
    },
    flipPlayer() {
      this.flipped = !this.flipped;
    },
    divPlayer() {
      const isDivPlayer = this.titletype in ["youtube", "vimeo"];
      console.log("isDivPlay", isDivPlayer);
      return isDivPlayer;
    },
    // sliderEvt(e) {
    //  this.seekTo(e)
    // },
    // async sliderEvt(e) {
    //   await this.$nextTick(() => {
    //     // console.log("currenttime", this.player.currentTime);
    //     // console.log("slideevt", e);
    //     this.seekTo(e, this.player);
    //     console.log("slide time", this.player.currentTime);
    //   });
    // },
    seekTo(time) {
      this.player.currentTime = time;
      this.ctime = time;
    },
    pausePlayer() {
      this.player.pause();
    }
  }
};
</script>
<style scoped>
@import "https://cdn.plyr.io/3.6.2/plyr.css";
.videoWrapper {
  position: relative;
  height: 0;
  /* padding-bottom: calc(var(--aspect-ratio, 0.455) * 100%); */
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
