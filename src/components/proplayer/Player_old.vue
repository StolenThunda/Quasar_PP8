<template>
  <v-container>
    <v-row>
      <v-col>
        <!-- <video-player v-bind="currentSetup" /> -->
        <v-card outlined v-model="currentSetup" v-if="currentSetup">
          <v-card-title class="heading">{{ currentSetup.title }}</v-card-title>
          <v-card-text>
            <div class="player_container mx-auto">
              <div class="c-video">
                <video ref="thePlayer" id="videoPlayer" controls>
                  <source :src="currentSetup.src" :type="currentSetup.type" />
                </video>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="mb-0" justify="space-between">
      <v-col class="text-left controls mb-10">
        <v-slider track-color="grey" always-dirty thumb-label dense>
          <template v-slot:prepend>
            <span class="subheading font-weight-light mr-1">00:00:00</span>
          </template>
          <template v-slot:append>
            <span class="subheading font-weight-light mr-1">00:00:00</span>
          </template>
        </v-slider>
      </v-col>
    </v-row>
    <v-row class="mb-0" justify="space-around">
      <v-col>
        <v-btn-toggle class="controls" dark>
          <v-btn large outlined @click="playerPlay">
            <v-icon large>
              {{ isPlaying ? " pause" : " play" }}
            </v-icon>
          </v-btn>
          <v-btn large outlined @click="playbackRestart">
            <v-icon>fa fa-fast-backward</v-icon>
          </v-btn>
          <v-btn large outlined @click="playbackRewind5">
            <v-icon class="mr-1">fa fa-backward</v-icon><sup>5</sup>
          </v-btn>
          <v-btn large outlined @click="playbackForward5">
            <v-icon class="mr-1">fa fa-forward</v-icon><sup>5</sup>
          </v-btn>
          <v-btn large outlined @click="setLoopStart">
            <v-icon>[ A </v-icon>
          </v-btn>
          <v-btn large outlined @click="setLoopEnd">
            <v-icon>B ]</v-icon>
          </v-btn>
          <v-btn large outlined @click="toggleLooping">
            <v-icon>fa fa-sync-alt</v-icon>
          </v-btn>
          <v-btn large outlined>
            <q-icon name="cog</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import VideoPlayer from "../components/proplayer/VideoPlayer";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("watch");
import jquery from "jquery";
// import "mediaelement/full";
if (process.browser) {
  require("mediaelement");
}
export default {
  name: "PlayerWrapper",
  data: () => ({
    isPlaying: false,
    player: null
  }),
  components: {
    // "video-player": VideoPlayer
  },
  mounted() {
    this.init();
  },
  computed: {
    ...mapState(["currentSetup"])
  },
  methods: {
    init() {
      if (this.componentDidMount) {
        console.log("Initializing player");
        this.player = this.$refs.thePlayer;
        // this.playerInitialize();
        console.log("Initialized player", this.player);
      }
    },
    playerInitialize() {
      const $ = jquery;
      console.log("cSetup", this.currentSetup);
      if (this.currentSetup) {
        const setup = {
          pluginPath: "https://cdnjs.com/libraries/mediaelement/",
          shimScriptAccess: "always",
          ...this.currentSetup,
          success: function(mediaelement, originalNode, instance) {
            console.log("me", mediaelement);
            console.log("on", originalNode);
            console.log("i", instance);
            this.player = instance;
          }
        };
        console.log("config", setup);
        this.player = $("#videoPlayer").mediaelementplayer(setup);
        console.log("this.player", this.player);
        return this;
      } else {
        setTimeout(() => this.init(), 3000);
      }
    },

    playerDispose() {
      this.player.dispose();
    },
    componentDidMount() {
      let loaded = false;
      if (!loaded) {
        const tag = document.createElement("script");
        tag.src = "//www.youtube.com/player_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        loaded = true;
        console.log("script added");
      }
      return loaded;
    },
    playerPlay() {
      this.player.play();
      if (this.isPlaying) this.playerPause();
      this.isPlaying = !this.isPlaying;
    },
    playerPause() {
      this.player.pause();
    },
    playerSetSrc() {
      // console.log("player url", url);
      this.player.src();
    },
    playerSetVolume(float) {
      this.player.volume(float);
    },
    playerSetPoster(url) {
      this.player.poster(url);
    },
    playerSetTime(time) {
      this.player.currentTime(time);
    },
    playerEventEnded() {
      console.log("ended");
    },
    playerEventVolume() {
      this.volume = this.player.volume();
    },
    playerEventError() {
      console.log(this.playerGetError());
    },
    playerGetPaused() {
      return this.player.paused();
    },
    playerGetTime() {
      return this.player.currentTime();
    },
    playbackRestart() {
      this.playerSetTime(0);
    },
    playbackRewind5() {
      this.playerSetTime(this.playerGetTime() - 5);
    },
    playbackForward5() {
      this.playerSetTime(this.playerGetTime() + 5);
    },
    setLoopStart() {},
    setLoopEnd() {},
    toggleLooping() {},
    playerGetError() {
      return this.player.error().message;
    },
    playerSetupEvents() {
      this.player.on("ended", function() {
        window.playerEvents.playerEventEnded();
      });
      this.player.on("volumechange", function() {
        window.playerEvents.playerEventVolume();
      });
      this.player.on("error", function() {
        window.playerEvents.playerEventError();
      });
    },
    beforeDestroy() {
      this.playerDispose();
    }
  }
};
</script>

<style scoped>
/* @import "mediaelement/src/css/MediaElementPlayer.css"; */
.player_container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 65vh;
}
.controls {
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: stretch;
  bottom: 0;
  width: 100%;
  flex-wrap: wrap;
  background: rgba(0, 0, 0, 0.7);
}

.video {
  width: 100%;
}

.c-video {
  height: 100%;
  width: 100%;
  max-width: 90vw;
  position: relative;
}
</style>
