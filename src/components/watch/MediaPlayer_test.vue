<template>
  <!-- <div class="q-ma-md q-pa-md" >    -->
  <!-- <mediaelement :set="cs = currentSetup"
    v-bind="cs"
      id="mediaplayer" 
      ref="mediaplayer"
      class="my-play q-ma-lg q-pa-lg-md"
      :poster="cs.poster" 
      :preload="cs.preload" 
      :controls="cs.controls" 
      :source="cs.sources[0].src"
      >     
    </mediaelement> -->
  <q-media-player
    type="video"
    id="mediaplayer"
    ref="mediaplayer"
    :poster="poster"
    :sources="sources"
    preload
    controls
    class="my-play q-ma-xl"
  />
  <!-- :preload="cs.preload" 
      :controls="cs.controls"  -->
  <!-- <details>
      <summary>currentSetup</summary> 
      <p><pre>{{ cs }}</pre></p> 
    </details>
  </div> -->
</template>

<script>
// require('vue-mediaelement/dist/vue-mediaelement.css');
// import { Mediaelement } from 'vue-mediaelement';
// import { mapState } from "vuex";
export default {
  props: {
    controls: Boolean,
    poster: String,
    sources: Array,
    allowfullscreen: Boolean,
    color: String,
    title: String,
    id: String,
    to: String,
    playsinline: Boolean,
    "webkit-playsinline": Boolean,
    preload: [String, Boolean],

  }
  // computed: {
  //   ...mapState("watch", ["currentSetup"])
  // },
};
</script>

<style>
/* .mejs__overlay-button {
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
} */
</style>
