<template>
  <v-card outlined>
    <v-card-title class="heading">{{ this.title }}</v-card-title>
    <v-card-text>
      <div class="player_container mx-auto">
        <div class="c-video">
          <video
            ref="videoPlayer"
            class="mejs__player"
            id="videoPlayer"
            preload="true"
          >
            <source :src="this.src" :type="this.type" />
            <!-- data-mejsoptions='{"pluginPath": "/mediaelement/build/ cd", "alwaysShowControls": "true"}'> -->
            <!-- ref="myPlayer"
            class="video-js video vjs-big-play-centered vjs-fluid"
            preload
            :poster="this.poster"
            :data-setup="JSON.stringify(this.$props)"
          > -->
            <!-- <source :src="this.sources[0].src" :type="this.sources[0].type" /> -->
            <!-- <p class="vjs-no-js">
              To view this video please enabe Javascript, and consider upgrading
              to a web browser that
              <a href="http://videojs.com/html5-video-support/" target="_blank">
                supports HTML5 video</a
              >
            </p> -->
          </video>
          <v-btn @click="expand = !expand">
            Options
          </v-btn>
          <v-expand-transition>
            <v-card v-show="expand" class="mx-auto">
              <v-card-text>
                <span>
                  <pre>
                {{ this.$props }}
                </pre
                  >
                </span>
              </v-card-text>
              <v-card-actions></v-card-actions>
            </v-card>
          </v-expand-transition>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "VideoPlayer",
  props: {
    id: String,
    poster: String,
    src: String,
    type: String,
    title: String
  },
  data: () => ({ expand: false })
};
</script>
