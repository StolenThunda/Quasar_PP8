<template>
  <div class="player">
    <plyr-vue v-if="divPlayer" ref="mediaPlayer">
      <div class="plyr__video-embed videoWrapper" id="mediaPlayer">
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

    <player-controls @hook:mounted="setEvents" @player-play="play" @player-pause="pause" />
  </div>
</template>

<script>
import Vue from "vue";
import VuePlyr from "vue-plyr";
Vue.use(VuePlyr);
// Vue.component('plyr-vue', VuePlyr)
const CONTROL_EVENTS = [
  {
    name: "player-play",
    callback: () => {
      console.log("playing");
      this.$refs.mediaPlayer.play();
    }
  },
  {
    name: "player-pause",
    callback: () => {
      console.log("pause");
      this.$refs.mediaPlayer.pause();
    }
  }
];
export default {
  name: "PlyermediaPlayer",
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
  // data: () => ({ player: null }),
  components: {
    "plyr-vue": VuePlyr,
    "player-controls": () => import("components/watch/PlayerControls")
  },
  mounted() {
    // this.player = new Plyr("#mediaPlayer");
  },
  computed: {
    
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
    setEvents() {
      // debugger
      for (let e of CONTROL_EVENTS) {
        this.$on(e.name, e.callback);
      }
    },
    player() {
      return this.$refs.mediaPlayer.player;
    },
    divPlayer() {
      const isDivPlayer = this.titletype in ["youtube", "vimeo"];
      console.log("isDivPlay", isDivPlayer);
      return isDivPlayer;
    },
    // play() {
    //   console.log("playing");
    //   this.player().play();
    // },
    // pause() {
    //   console.log("pause");
    //   this.player().play();
    // }
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
:root .mejs__poster img {
  display: block !important;
}
.my-play {
  /* width: 90vw; */
  height: 700px;
  text-align: center;
}
</style>
