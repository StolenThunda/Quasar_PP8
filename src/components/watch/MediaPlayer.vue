<template>
  <div>
    <span class="text-capitalize">{{this.type}}</span> Attrs:
    <pre>{{ $attrs }}</pre>
    
    <video 
      v-bind="$attrs"
      id="videoPlayer" 
      class="" 
      :controls="this.controls"
      :src="this.src" 
      :allowfullscreen="this['allowfullscreen']"
      :webkit-playsinline="this['webkit-playsinline']"
      :playsinline="this['playsinline']"
      :preload="this['preload']" 
      crossorigin="anonymous">
      <source :src="this.cdn_url + '/audio/' + id" type="audio/mp3" v-show="this.type='audio'" />
    </video> 
  </div>
</template>

<script>

export default {
  inheritAttrs: false,
  name: "MediaPlayer",
  // data: () => ({
  //   category: {
  //     mediaplayer: ['youtube', 'vimeo', 'audio'],
  //     pdf: []
  //   }
  // }),
  // mounted() {
  //   console.dir(this.category)
  // },
};
</script>
