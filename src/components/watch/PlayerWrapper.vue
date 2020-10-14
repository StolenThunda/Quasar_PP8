<template>
    <q-page
      id="mediaPlayerWrapper"
      v-if="currentSetup.sources"
      :set="(s = currentSetup.sources[0])"
    >
    {{ currentSetup }}
      <pdf-renderer v-if="s.type==='pdf'"  :src="s.src" />
      <soundslice-renderer v-if="s.type==='soundslice'" :src="s.src" />
      <media-player v-if="!(this.currentSetup.type in this.renderers)" v-bind="currentSetup"  :src="s.src" />
  </q-page>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MediaPlayerWrapper",  
  components: {
    "pdf-renderer": () => import("components/watch/renderers/PDF"),
    "soundslice-renderer": () =>import("components/watch/renderers/SoundSlice"),
    "media-player": () => import("components/watch/MediaPlayer"),
  },
  data: () => ({
    renderers: ['pdf', 'soundslice']
  }),
  computed: {  
    // isRenderer() {
    //   debugger
    //   return this.currentSetup.type in this.renderers
    // },
    ...mapState("watch", ["currentSetup"])
  },
  methods: {
    //   isRenderer() {
    //   debugger
    //   return this.currentSetup.type in this.renderers
    // },
  }
};
</script>
