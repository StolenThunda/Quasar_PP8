<template>
  <q-page class="media-container">
    Type: {{ mediaType }}
    <div
      v-if="mediaType === 'html'"
      v-html="ProPlayer.theSegment.getHTMLContent().replaceAll('h2', 'h5')"
    />

    <soundslice-renderer
      v-else-if="mediaType === 'soundslice'"
      :src="currentSetup.data"
    />
    <template v-if="renderers.includes(currentSetup.mediaType)">
      <pdf-renderer v-if="s.type === 'pdf'" :src="s.src" />
    </template>
    <div
      v-else-if="currentSetup.sources"
      class="media-container"
      id="mediaPlayerWrapper"
      :set="(s = currentSetup.sources[0])"
    >
      <media-player
        v-bind="currentSetup"
        :key="'mediaPlayer-' + componentKey"
        :src="s.src"
      />
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
// import SoundSlice from './renderers/SoundSlice.vue';
export default {
  name: "MediaPlayerWrapper",
  components: {
    "pdf-renderer": () => import(/* webpackChunkName: "watch-player" */"components/watch/renderers/PDF.vue"),
    "soundslice-renderer": () =>
      import(/* webpackChunkName: "watch-player" */"components/watch/renderers/SoundSlice.vue"),
    "media-player": () => import(/* webpackChunkName: "watch-player" */"src/components/watch/player/MediaPlayer.vue")
  },
  data: () => ({
    componentKey: 0,
    renderers: ["pdf"]
  }),
  created() {
    this.$root.$on("flip-player", this.flipper);
  },
  mounted() {
    this.openSegment(this.$route.params.segmentID);
  },
  computed: {
    mediaType() {
      return this.ProPlayer.theSegment.getPrimaryMediaType();
    },
    ...mapState("watch", ["currentSetup", "ProPlayer"])
  },
  watch: {
    currentSetup() {
      // console.info("setup changed", this.currentSetup);
      this.forceRerender();
    }
  },
  methods: {
    ...mapActions("watch", ["openSegment"]),
    forceRerender() {
      this.componentKey += 1;
    }
  }
};
</script>
<style>
 #mediaPlayerWrappers {
  /* bottom: 0; */
  /* position: absolute; */
  top: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  border: none;
  padding: 0;
  margin: 0;
}
.media-content-wrapper {
  /* position: absolute; */
  top: 0;
  left: 0;
  width: 100%;
  /* bottom: 0; */
  /* padding: 1rem; */
  background: #222;
  /* overflow: auto; */
}
/*
#mediaPlayer iframe {
  height: 100%;
  width: 100%;
   bottom: 0; 
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  overflow: hidden; 
  border: none;
  padding: 0;
  margin: 0;
} */
</style>
