<template>
  <div id="mediaControlsWrapper">
    <slot name="slider" />
    <!-- <div id="progressSliderWrapper">
      <div id="current-time">0.00</div>
      <div id="time-left"></div>
      <div id="progressSlider">
        <div id="loop-region" style="display: none"></div>
        <div id="chapters-wrapper"></div>
      </div>
    </div> -->

    <div id="transportButtonsWrapper">
      <ul id="transportButtonsList">
        <li>
          <q-btn
            id="playback-play"
            class="transport-button"
            title="Toggle Playback."
            :icon="isPlaying ? 'mdi-pause' : 'mdi-play'"
            @click="$root.$emit('togglePlay')"
          />
        </li>
        <li class="">
          <q-btn
            id="playback-beginning"
            class="transport-button"
            @click="$root.$emit('restart', 0);"
            icon="mdi-skip-backward"
            title="Back to the beginning."
            :disable="this.currentTime === 0"
          />
        </li>
        <li class="">
          <q-btn
            id="playback-rewind"
            class="transport-button"
            @click="$root.$emit('seek-5', seekTime(-5))"
            title="Rewind 5 Seconds."
            icon-right="mdi-rewind-5"
          >
          </q-btn>
        </li>
        <li class="">
          <q-btn
            id="playback-forward"
            class="transport-button"
            @click="$root.$emit('seek5', seekTime(5))"
            title="Forward 5 Seconds."
            icon="mdi-fast-forward-5"
          >
          </q-btn>
        </li>
        <li class="">
          <q-btn
            id="looping-start"
            class="transport-button"
            @click="$root.$emit('loopStart')"
            title="Set loop starting point."
            :color="typeof loopStart === 'number' ? 'green' : 'white'"
            icon="mdi-arrow-collapse-left"
            flat
          >
            <span class="text-weight-bold text-body1 q-px-xs">A</span>
          </q-btn>
        </li>
        <li class="">
          <q-btn
            id="looping-stop"
            class="transport-button"
            @click="$root.$emit('loopStop')"
            title="Set loop stopping point."
            :color="typeof loopStop === 'number' ? 'green' : 'white'"
            :disable="stopDisabled"
            icon-right="mdi-arrow-collapse-right"
            flat
          >
            <span class="text-weight-bold text-body1 q-px-xs">B</span>
          </q-btn>
        </li>
        <li class="">
          <q-btn-dropdown
            id="looping-toggle"
            split
            :disable-dropdown="!isLoopDefined"
            title="Begin/End Looping."
            class="transport-button"
            :color="!isLoopDefined ? 'grey' : 'green'"
            :disable="!isLoopDefined"
            icon="mdi-autorenew"
            :class="{ rotate: looping }"
            @click="toggleLooping(); $root.$emit('toggleLooping')"
          >
            <q-list>
              <q-item clickable v-close-popup @click="toggleLooping(false); $root.$emit('clear-loop');">
                <q-item-section avatar>
                  <q-avatar
                    icon="mdi-minus-circle-off"
                    color="primary"
                    text-color="white"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Clear Loop</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </li>
        <li>
          <video-settings-menu />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import MediaProgressSlider from "./MediaProgressSlider.vue";
export default {
  name: "PlayerControls",
  components: {
    videoSettingsMenu: () =>
      import("components/watch/settings/VideoSettings.vue")
  },
  props: ["isPlaying", "loopStart", "loopStop", "currentTime", "isLoopDefined"],
  data: () => ({ looping: false }),
  computed: {
    stopDisabled() {
      return !(typeof this.loopStart === "number");
    },
    seekTime(val) {
      return this.currentTime + val
    }
  },
  methods: {
    toggleLooping(val) {
      this.looping = (val) ? val : !this.looping;
    }
  }
};
</script>

<style scoped>
div.rotate >>> i.mdi-autorenew {
  display: inline-block !important;
  animation: rotation 2s infinite linear !important;
}

@keyframes rotation {
  50% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
#mediaWrapper {
  position: absolute;
  /* // top: 2.75rem; */
  left: 0;
  right: 0;
  bottom: 0;
}
#mediaPlayerWrapper {
  /* // bottom: 4.9rem; */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  /* // bottom: 7.5rem; */
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
  /* // padding-top: 0.25em; */
  /* // padding-bottom: 0.25em; */
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
  /* // line-height: 2.5em; */
  background: none;
  border: none;
  /* // font-size: 1rem; */
  -webkit-font-smoothing: antialiased;
  color: white;
  text-align: center;
  /* // font-weight: 600; */
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
