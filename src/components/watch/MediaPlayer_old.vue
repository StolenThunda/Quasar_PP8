<template>
  <div>
    <p><span class="text-uppercase">{{ $attrs.type }}</span> Attrs:
    <pre>{{ $attrs }}</pre></p>
    
    <video 
      v-bind="$attrs"
      id="videoPlayer" 
      class="" 
      :controls="this.controls"
      :src="this.src" 
      :allowfullscreen="this.allowfullscreen"
      :playsinline="this.playsinline"
      :preload="this.preload" 
      crossorigin="anonymous">
      <source :src="this.cdn_url + '/audio/' + this.id" type="audio/mp3" v-if="this.type=='audio'" />
    </video> 
      <!-- :webkit-playsinline="this['webkit-playsinline']" -->
  </div>
</template> 

<script>

export default {
  inheritAttrs: false,
  name: "MediaPlayer",
  props: {
    id: {
      type: String
    },
    type: {
      type: String,
      default: ""
    },
    controls: {
      type: Boolean,
      default: false
    },
    src: {
      type: String,
      default: ""
    },
    allowfullscreen: {
      type: Boolean,
      default: false
    },
    playsinline: {
      type: Boolean,
      default: false
    },
    "webkit-playsinline": {
      type: Boolean,
      default: false
    },
    preload: {
      type: Boolean,
      default: false
    },
    cdn_url: {
      type: String,
      default: ""
    }
  }
};
</script>
