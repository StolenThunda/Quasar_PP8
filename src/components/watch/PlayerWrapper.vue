<template>
  <div
    id="mediaPlayerWrapper"
    v-if="currentSetup.sources"
    :set="(s = currentSetup.sources[0])"
  >
    <media-player
      v-if="!(this.currentSetup.type in this.renderers)"
      v-bind="currentSetup"
      :key="'mediaPlayer-' + componentKey"
      :src="s.src"
    />
    <pdf-renderer v-if="s.type === 'pdf'" :src="s.src" />
    <soundslice-renderer v-if="s.type === 'soundslice'" :src="s.src" />
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
    flipped: false,
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
      console.info("setup changed");
      this.forceRerender();
    }
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
    }
  }
};
</script>
