<template>
  <div
    id="mediaPlayerWrapper"
    v-if="currentSetup.sources"
    :set="(s = currentSetup.sources[0])"
  >
    <template v-if="renderers.includes(s.mediaType)">
      <pdf-renderer v-if="s.type === 'pdf'" :src="s.src" />
      <soundslice-renderer v-if="s.type === 'soundslice'" :src="s.src" />
    </template>
    <media-player
      v-else
      v-bind="currentSetup"
      :key="'mediaPlayer-' + componentKey"
      :src="s.src"
    />
    <!-- {{ s.type }} -->
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "MediaPlayerWrapper",
  components: {
    "pdf-renderer": () => import("components/watch/renderers/PDF.vue"),
    "soundslice-renderer": () =>
      import("components/watch/renderers/SoundSlice.vue"),
    "media-player": () => import("components/watch/MediaPlayer.vue")
  },
  data: () => ({
    componentKey: 0,
    renderers: ["pdf", "soundslice"]
  }),
  created() {
    this.$root.$on("flip-player", this.flipper);
  },
  mounted() {
    const media = this.fetchPackage(this.$route.params.packageID).then(
      () => this.fetchDefaultMedia(),
      error => {
        console.error("Something ain't right");
      }
    );
  }, 
  computed: {
    ...mapState("watch", ["currentSetup"])
  },
  watch: {
    currentSetup() {
      console.info("setup changed",this.currentSetup);
      this.forceRerender();
    }
  },
  methods: {
    ...mapActions("watch", ["fetchPackage", "fetchDefaultMedia"]),
    isRenderer(type) {
      console.log("type", type);
      return this.renderers.includes(type);
    },
    forceRerender() {
      this.componentKey += 1;
    }
  }
};
</script>
<style >

#mediaPlayerWrapper {
  bottom: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  /* background: black; */
  overflow: hidden;
  border: none;
  padding: 0;
  margin: 0;
}
</style>