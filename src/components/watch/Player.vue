<template>
  <div id="mediaPlayerWrapper">
    <h6 class="text-uppercase">{{ currentSetup.type }}</h6>
    <div
      v-if="currentSetup.type == 'pdf'"
      id="video-player-wrapper"
      class="no-controls"
    >
      <iframe
        width="1000"
        height="800"
        :src="currentSetup.src"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
    <div v-if="currentSetup.type == 'soundslice'">
      <iframe
        id="ssembed"
        :src="getSoundsliceLink"
        width="100%"
        height="800px"
        frameBorder="0"
      ></iframe>
    </div>
    <media-player v-bind="currentSetup" v-else />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MediaContentPlayerWrapper",
  components: {
    "media-player": () => import("components/watch/MediaPlayer")
  },
  computed: {
    getSoundsliceLink: () => {
      return `https://www.soundslice.com/scores/${currentSetup.src}/embed/?api=1&show_title=0&branding=2`;
    },
    ...mapState("watch", ["currentSetup"])
  }
};
</script>
