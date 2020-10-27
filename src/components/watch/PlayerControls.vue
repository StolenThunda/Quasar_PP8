<template>
  <div id="mediaControlsWrapper">
    <div id="progressSliderWrapper">
      <div id="current-time">0.00</div>
      <div id="time-left"></div>
      <div id="progressSlider">
        <div id="loop-region" style="display: none"></div>
        <div id="chapters-wrapper"></div>
      </div>
    </div>

    <div id="transportButtonsWrapper">
      <ul id="transportButtonsList">
        <li>
          <button
            @click="playing = !playing"
            id="playback-play"
            class="transport-button"
            title="Toggle Playback."
          >
            <i v-show="!playing" class="fa fa-play" disabled></i>
            <i v-show="playing" class="fa fa-pause" disabled></i>
          </button>
        </li>
        <li class="">
          <button
            id="playback-beginning"
            class="transport-button"
            @click="restartPlayback"
            title="Back to the beginning."
          >
            <i class="fa fa-fast-backward"></i>
          </button>
        </li>
        <li class="">
          <button
            id="playback-rewind"
            class="transport-button"
            @click="seek"
            title="Rewind 5 Seconds."
          >
            <i class="fa fa-backward"></i> <sup>5</sup>
          </button>
        </li>
        <li class="">
          <button
            id="playback-forward"
            class="transport-button"
            @click="seek('forward')"
            title="Forward 5 Seconds."
          >
            <i class="fa fa-forward"></i> <sup>5</sup>
          </button>
        </li>
        <li class="">
          <button
            id="looping-start"
            class="transport-button"
            @click="loopA = player.currentTime"
          >
            <q-btn
              title="Set loop starting point."
              size="md"
              :color="loopA ? 'green' : 'white'"
              label="[ A"
              flat
            />
          </button>
        </li>
        <li class="">
          <button
            id="looping-stop"
            class="transport-button"
            @click="loopB = player.currentTime"
          >
            <q-btn
              title="Set loop stopping point."
              size="md"
              :color="loopB ? 'green' : 'white'"
              label="B ]"
              flat
            />
          </button>
        </li>
        <li class="">
          <button
            id="looping-toggle"
            class="transport-button "
            @click="isLooping = !isLooping"
            title="Begin/End Looping."
          >
            <q-icon name="mdi-sync" size="sm"></q-icon>
          </button>
        </li>
        <li>
          <button
            id="controls-toggle"
            class="transport-button"
            title="Video Settings."
          >
            <q-icon name="mdi-cog"></q-icon>
            <q-menu
              class="q-ma-lg"
              anchor="top left"
              self="bottom left"
              transition-show="flip-right"
              transition-hide="flip-left"
              fit
            >
              <q-list class="q-pa-md" dense>
                <q-item>
                  <q-item-section avatar>
                    <q-icon color="secondary" name="volume_up" title="Volume" />
                  </q-item-section>
                  <q-item-section>
                    <q-slider
                      v-model="volume"
                      :min="0"
                      :max="1"
                      :step="0.1"
                      label
                      color="secondary"
                      @change="volumeChange"
                    />
                  </q-item-section>
                </q-item>
                <q-item  tag="label" v-ripple>
                  <!-- TODO: ENABLE ZOOM -->
                  <q-item-section avatar>
                    <q-checkbox color="secondary" v-model="videoZoomEnabled" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Video Zoom</q-item-label>
                  </q-item-section>
                </q-item>                      
                <q-item v-show="videoZoomEnabled">
                  <q-item-section>
                    <q-slider
                      v-model="zoom"
                      :min="1"
                      :max="4"
                      :step="0.005"
                      label
                      color="secondary"
                    />
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    <q-icon
                      name="mdi-play-speed"
                      color="secondary"
                      title="Speed"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-slider
                      v-model="speed"
                      :min="0.5"
                      :max="1.5"
                      :step="0.25"
                      label
                      color="secondary"
                      @change="speedChange"
                    />
                  </q-item-section>
                </q-item>
                <q-item-label>Options</q-item-label>
                <q-separator />
                <!-- <hr />  -->
                <q-item>
                  <q-item-section avatar>
                    <q-checkbox
                    color="secondary"
                      v-model="lefty"
                      @click="this.lefty = !this.lefty"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Lefty View</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayerControls",
  data: () => ({
    speed: 0.5,
    volume: 0.5,
    zoom: 1,
    lefty: false,
    playing: false,
    loopA: null,
    loopB: null,
    isLooping: false,
    videoZoomEnabled: false
  }),
  watch: {
    lefty() {
      this.$root.$emit("flip-player");
    },
    playing(value) {
      // this.$q.notify({message: 'Toggling Play/Pause Media'})
      this.player.togglePlay(value);
    },
    isLooping(loopState) {
      console.log("starting loop");
      if (this.isLoopDefined) {
        if (loopState) {
          this.isLooping = false;
        } else {
          if (!this.player.playing) this.playing = true;
          if (this.loopA < this.loopB && this.isLoopDefined)
            this.player.currentTime = this.loopA;
        }
      }
    }
  },
  computed: {
    isLoopDefined() {
      return (
        typeof this.loopA !== "undefined" && typeof this.loopB !== "undefined"
      );
    },
    player() {
      return this.$parent.$refs.mediaPlayer.player;
    }
    // volume() {
    //   return this.player.volume;
    // },
    // speed() {
    //   return this.player.speed;
    // }
  },
  methods: {
    flipper(e) {
      if (e.target.checked) console.log(e.target.value);
      this.lefty = !this.lefty;
    },
    restartPlayback() {
      // this.$q.notify({message: 'Restarting Media'})
      this.player.currentTime = 0;
      this.player.pause();
    },
    seek(dir) {
      let cTime = this.player.currentTime;
      console.log("b4", this.player.currentTime);
      if (dir === "forward") {
        this.player.forward(cTime + 5);
      } else {
        this.player.rewind(cTime - 5);
      }
      console.log("after", this.player.currentTime);
    },
    toggleLooping() {
      this.isLooping = !this.isLooping;
      if (this.player.playing) {
        this.player.pause();
      } else if (this.loopA && this.loopB) {
        this.player.currentTime = loopA;
        while (this.player.playing) {
          if (this.player.currentime >= loopB) this.player.currentTime = loopA;
        }
      }
    },
    speedChange() {
      this.player.speed = this.speed;
    },
    volumeChange() {
      this.player.volume = this.volume;
    },
    zoomChange() {
      this.player.zoom = this.zoom;
    }
  }
};
</script>

<style lang="scss" scoped>
#mediaWrapper {
  position: absolute;
  top: 2.75rem;
  left: 0;
  right: 0;
  bottom: 0;
}
#mediaPlayerWrapper {
  bottom: 4.9rem;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 7.5rem;
  background: black;
  overflow: hidden;
  border: none;
  padding: 0;
  margin: 0;
}
#mediaControlsWrapper {
  position: absolute;
  bottom: 0;
  height: auto;
  width: 100%;
  background: #555;
  border-top: 1px solid #777;
}
#transportButtonsWrapper {
  float: left;
  width: 100%;
  background: linear-gradient(
    to bottom,
    rgba(40, 40, 40, 1) 0%,
    rgba(50, 50, 50, 1) 100%
  );
  z-index: 100;
  padding-top: 0.25em;
  padding-bottom: 0.25em;
}
ul#transportButtonsList {
  float: left;
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
}
ul#transportButtonsList li {
  width: 25%;
  float: left;
  padding: 0.1rem;
}
.transport-button {
  width: 100%;
  line-height: 2.5em;
  background: none;
  border: none;
  font-size: 1rem;
  -webkit-font-smoothing: antialiased;
  color: white;
  text-align: center;
  font-weight: 600;
  background: rgb(86, 86, 86);
  background: -moz-linear-gradient(
    top,
    rgba(86, 86, 86, 1) 0%,
    rgba(51, 51, 51, 1) 100%
  );
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, rgba(86, 86, 86, 1)),
    color-stop(100%, rgba(51, 51, 51, 1))
  );
  background: -webkit-linear-gradient(
    top,
    rgba(86, 86, 86, 1) 0%,
    rgba(51, 51, 51, 1) 100%
  );
  background: linear-gradient(
    to bottom,
    rgba(86, 86, 86, 1) 0%,
    rgba(51, 51, 51, 1) 100%
  );
  white-space: nowrap;
  border-radius: 3px;
  box-shadow: 0px 0px 3px #111;
}
#videoControlsMenu {
  line-height: 1rem;
  color: white;
  position: absolute;
  text-align: left;
  display: none;
  top: 0;
  bottom: 3rem;
  background: #222;
  right: 0;
  width: 300px;
  color: #ccc;
  border: 1px solid #555;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  font-size: 0.9rem;
  z-index: 2;
}
ul#transportButtonsList li {
  width: 12.5%;
}
.transport-button.engaged {
  background: rgb(204, 108, 108);
  background: -moz-linear-gradient(
    top,
    rgba(204, 108, 108, 1) 0%,
    rgba(204, 0, 0, 1) 100%
  );
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, rgba(204, 108, 108, 1)),
    color-stop(100%, rgba(204, 0, 0, 1))
  );
  background: -webkit-linear-gradient(
    top,
    rgba(204, 108, 108, 1) 0%,
    rgba(204, 0, 0, 1) 100%
  );
  background: -o-linear-gradient(
    top,
    rgba(204, 108, 108, 1) 0%,
    rgba(204, 0, 0, 1) 100%
  );
  background: -ms-linear-gradient(
    top,
    rgba(204, 108, 108, 1) 0%,
    rgba(204, 0, 0, 1) 100%
  );
  background: linear-gradient(
    to bottom,
    rgba(204, 108, 108, 1) 0%,
    rgba(204, 0, 0, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#cc6c6c', endColorstr='#cc0000',GradientType=0 );
}
</style>
