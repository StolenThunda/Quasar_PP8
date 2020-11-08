<template>
      <!-- <pan-zoom selector="#mediaPlayerWrapper"> -->
    <div 
    
      id="mediaPlayerWrapper"
      v-if="currentSetup.sources"
      :set="(s = currentSetup.sources[0])"
    >

      <media-player :key="'mediaPlayer-' + componentKey" v-if="!(this.currentSetup.type in this.renderers)" v-bind="currentSetup"  :src="s.src" />
      <pdf-renderer v-if="s.type==='pdf'"  :src="s.src" />
      <soundslice-renderer v-if="s.type==='soundslice'" :src="s.src" />
  </div>
      <!-- </pan-zoom> -->
</template>

<script>
import { mapState } from "vuex";
// import panZoom from "vue-panzoom";
// Vue.use(panZoom);
export default {
  name: "MediaPlayerWrapper",  
  components: {
    "pdf-renderer": () => import("components/watch/renderers/PDF"),
    "soundslice-renderer": () =>import("components/watch/renderers/SoundSlice"),
    "media-player": () => import("components/watch/MediaPlayer"),
  },
  data: () => ({
    componentKey: 0,
    flipped: false,
    renderers: ['pdf', 'soundslice']
  }),
  created(){
    this.$root.$on('flip-player', this.flipper)
  },
  computed: {
    ...mapState("watch", ["currentSetup"])
  },
  watch: {
    currentSetup() { 
      console.info('setup changed')
      this.forceRerender() }
  },
  methods: {
    forceRerender() { this.componentKey += 1 }
  }
};
</script>
