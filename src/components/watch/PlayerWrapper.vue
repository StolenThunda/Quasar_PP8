<template>
  <div
    id="mediaPlayerWrapper"
    v-if="currentSetup.sources"
    :set="(s = currentSetup.sources[0])"
  >
    <template v-if="renderers.includes(s.type)">
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
import { mapState } from "vuex";
export default {
  name: "MediaPlayerWrapper",
  components: {
    "pdf-renderer": () => import("components/watch/renderers/PDF"),
    "soundslice-renderer": () =>
      import("components/watch/renderers/SoundSlice"),
    "media-player": () => import("components/watch/MediaPlayer")
  },
  data: () => ({
    componentKey: 0,
    renderers: ["pdf", "soundslice"]
  }),
  created() {
    this.$root.$on("flip-player", this.flipper);
  },
  computed: {
    ...mapState("watch", ["currentSetup"])
  },
  watch: {
    currentSetup() {
      // console.info("setup changed");
      this.forceRerender();
    }
  },
  methods: {
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