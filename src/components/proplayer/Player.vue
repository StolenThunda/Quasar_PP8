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
                <video
                  class="mejs__player"
                  height="100%"
                  width="100%"
                  ref="thePlayer"
                  id="thePlayer"
                  webkit-playsinline
                  playsinline
                  allowfullscreen
                  crossorigin="anonymous"
                  controls
                >
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
import "mediaelement/src/css/mediaelementplayer.css";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("watch");
// import "mediaelement";

export default {
  name: "PlayerWrapper",
  data: () => ({
    isPlaying: false,
    player: null
  }),
  computed: {
    ...mapState(["currentSetup"])
  },
  mounted() {
    this.player = this.$refs.thePlayer;
    // this.player = new MediaElement(this.$refs.thePlayer, {
    //   pluginPath: "https://cdnjs.com/libraries/mediaelement/",
    //   success: function(mediaelement, origNode, instance) {
    //     console.info(mediaelement, origNode, instance)
    //   }
    // });
  },
  watch: {
    player() {
      this.playerInit();
    }
  },
  methods: {
    playerInit() {
      this.playerSetPoster(this.currentSetup.poster);
      this.playerSetSrc(this.currentSetup.src);
    },
    playerDispose() {
      this.player.dispose();
    },
    playerPlay() {
      if (this.player?.play) {
        this.player.play();
        if (this.isPlaying) this.playerPause();
        this.isPlaying = !this.isPlaying;
      } else {
        console.log("play broke");
      }
    },
    playerPause() {
      this.player.pause();
    },
    playerSetSrc(url) {
      // console.log("player url", url);
      debugger;
      this.player.src(url);
      return this;
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
