<template>
  <div>
    <div>
      MEDIA PLAYER
      <p><pre>{{ currentSetup }} </pre></p>
    </div>
    <q-media-player
    type="video"
    :poster="currentSetup.poster"
    :sources="getSources"
    />

    <!-- <object width="640" height="360">
      <param
        name="movie"
        :value="currentSetup.src + '&amp;rel=0&amp;hl=en_US&amp;version=3'" 
        />
      <param name="allowFullScreen" value="true" />
      <param name="allowscriptaccess" value="always" />
      <embed
        width="640"
        height="360"
        :src="currentSetup.src + '&amp;rel=0&amp;hl=en_US&amp;version=3'"
        class="youtube-player"
        type="text/html"
        allowscriptaccess="always"
        allowfullscreen="true"
      />
    </object> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MediaPlayer",
  computed: {
    getSources() { return [{src: this.currentSetup.src + '&amp;rel=0&amp;hl=en_US&amp;version=3', type:  this.currentSetup.type}]},
    ...mapState("watch", ["currentSetup"])
  },
};
</script>
