<template>
  <!-- <section >    -->
    <mediaelement :set="cs = currentSetup"
    v-bind="cs"
      id="mediaplayer" 
      ref="mediaplayer"
      class="my-play q-ma-lg q-pa-lg-md"
      :poster="cs.poster" 
      :preload="cs.preload" 
      :controls="cs.controls" 
      :source="cs.sources[0].src"
      >
      <!-- <source
        v-for="source in cs.sources"
        :key="source.src"
        :type="source.type"
        :src="source.src"
      /> -->
    </mediaelement>
    <!-- <details>
      <summary>currentSetup</summary> 
      <p><pre>{{ cs }}</pre></p> 
    </details>
  </section> -->
</template>

<script>
require('vue-mediaelement/dist/vue-mediaelement.css');
import { Mediaelement } from 'vue-mediaelement';
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  components: {
    'mediaelement' : Mediaelement
  },
  watch: {},
  // mounted() {
  //   this.options = {
  //     stretching: "responsive",
  //     previewMode: false,
  //     poster: this.poster,
  //     shimScriptAccess: "always",
  //     success: (mediaElement, node, instance) => {
  //       mediaElement.addEventListener('pause', () => { this.$root.$emit('togglePlay') });
  //       mediaElement.addEventListener('play', () => { this.$root.$emit('togglePlay') });
  //       mediaElement.load();
  //     },
  //   };
  //   this.player = this.playerObject = new MediaElementPlayer(
  //     this.id,
  //     this.options
  //   );
  //   // this.video = this.$el.querySelectorAll('video')[0];
    
  // },
  computed: {
    ...mapState("watch", ["currentSetup"])
  },
};
</script>

<style>

.mejs__overlay-button {
  outline: none !important;
}
.mejs__video {
  margin-bottom: 1.5rem;
}
video {
  max-width: 100%;
}
iframe {
  width: 100%;
  height: 100%;
}
:root .mejs__poster img {
  display: block !important;
}
.my-play {
  width: 90vw;
  height: 70vh;
  text-align: center;
}
</style>
