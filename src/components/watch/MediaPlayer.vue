<template>
  <div>
    <!-- <pan-zoom selector> -->
      <!-- :class="{ flipped: this.flipped }" -->
    <plyr-vue
      v-if="divPlayer"
      ref="mediaPlayer"
    >
        <!-- class="plyr__video-embed videoWrapper"  -->
      <div  
        :class="{ flipped: this.flipped }"  
        id="mediaPlayer"
        >
        <iframe
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
    <player-controls />
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
    cdn_url: String,
  },
  data: () => ({
    flipped: false
  }),
  created() {
    this.$root.$on("flip-player", this.flipPlayer);
  },
  components: {
    "plyr-vue": VuePlyr,
    // "pan-zoom": panZoom,
    "player-controls": () => import("components/watch/PlayerControls")
  },
  computed: {
    vimeoPlayer() {
      return `https://player.vimeo.com/video/${this.sources[0].src}?loop=false&amp;byline=false&amp;portrait=false&amp;title=false&amp;speed=true&amp;transparent=0&amp;gesture=media`;
    },
    youtubePlayer() {
      // return `http://www.youtube.com/embed/${this.sources[0].src}?rel=0&hd=1 `;
      return `https://www.youtube.com/embed/${this.sources[0].src}?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1`;
    }
  },

  methods: {

    flipPlayer() { this.flipped = !this.flipped}, 
    divPlayer() {
      const isDivPlayer = this.titletype in ["youtube", "vimeo"];
      console.log("isDivPlay", isDivPlayer);
      return isDivPlayer;
    }
  }
};
</script>
<style scoped>
@import "https://cdn.plyr.io/3.6.2/plyr.css";
.videoWrapper {
  position: relative;
  padding-bottom: 36.25%;
  height: 0;
  padding-bottom: calc(var(--aspect-ratio, 0.3625) * 100%);
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
