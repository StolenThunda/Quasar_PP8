<template>
  <div id="mediaControlsWrapper" class="col-12">
    <slot name="slider" />
    <div id="transportButtonsWrapper" class="row">
      <q-btn
        id="playback-play"
        class="transport-button col"
        title="Toggle Playback."
        :icon="isPlaying ? 'mdi-pause' : 'mdi-play'"
        @click="$root.$emit('togglePlay')"
      />

      <q-btn
        id="playback-beginning"
        class="transport-button col"
        @click="$root.$emit('restart', 0)"
        icon="mdi-skip-backward"
        title="Back to the beginning."
        :disable="this.currentTime === 0"
      />

      <q-btn
        id="playback-rewind"
        class="transport-button col"
        @click="$root.$emit('seek-5', seekTime(-5))"
        title="Rewind 5 Seconds."
        icon-right="mdi-rewind-5"
      >
      </q-btn>

      <q-btn
        id="playback-forward"
        class="transport-button col"
        @click="$root.$emit('seek5', seekTime(5))"
        title="Forward 5 Seconds."
        icon="mdi-fast-forward-5"
      >
      </q-btn>

      <q-btn
        id="looping-start"
        class="transport-button col"
        @click="$root.$emit('loopStart', currentTime)"
        title="Set loop starting point."
        :color="isStartSet"
      >
        <div class="row items-center no-wrap">
          <q-icon left name="mdi-arrow-collapse-left" class="q-px-xs" />
          <span class="text-weight-bolder text-body1">A</span>
        </div>
      </q-btn>

      <q-btn
        id="looping-stop"
        class="transport-button col"
        @click="$root.$emit('loopStop', currentTime)"
        title="Set loop stopping point."
        :color="isStopSet"
        :disable="start === -1"
      >
        <div class="row items-center no-wrap">
          <span class="text-weight-bolder text-body1 q-px-xs">B</span>
          <q-icon left name="mdi-arrow-collapse-right" />
        </div>
      </q-btn>

        <!-- icon="mdi-autorenew" -->
      <q-btn-dropdown
        class="transport-button col"
        split
        id="looping-toggle"
        :disable-dropdown="!isValidLoop"
        title="Begin/End Looping."
        :color="!isValidLoop ? 'primary' : 'green'"
        :disable="!isValidLoop"
        @click="
          $store.commit('watch/TOGGLE_LOOPING');
          $root.$emit('togglePlay');
        "
      >
      <template #label>
        <q-icon 
          name="mdi-autorenew" 
        :class="{rotate: rotating}"
        /> {{ showLoopMessage }}
      </template>
      {{ this.looping }}
        <q-list>
          <q-item v-if="isValidLoop" class="bg-accent">
             <q-item-section avatar>
              <q-avatar
                icon="mdi-minus"
                color="primary"
                text-color="white"
              />
            </q-item-section>           
            <q-item-section>
              <q-item-label>{{ showLoopMessage}}</q-item-label>
              <q-item-label>{{ getLoopStartTime }} -> {{ getLoopStopTime }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            clickable
            v-close-popup
            @click="
              $store.dispatch('watch/clearLoop')
            "
          >
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

      <video-settings-menu class="col" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { utilities } from "../../../mixins/utilities";
export default {
  mixins: [utilities],
  name: "PlayerControls",
  components: {
    videoSettingsMenu: () =>
      import(
        /* webpackChunkName: "watch-player" */ "components/watch/settings/VideoSettings"
      )
  },
  props: ["currentTime"],
  computed: {
    ...mapState("watch", {
      start: state => state.playerSettings.loop_start,
      stop: state => state.playerSettings.loop_stop,
      isPlaying: state => state.playerSettings.playing,
      looping: state => state.playerSettings.looping
    }),
    ...mapGetters("watch", ["isValidLoop", "getLoopStart", "getLoopStop"]),
    getLoopStopTime(){ return this.secondsToMinutes(Math.floor(this.getLoopStop))},
    getLoopStartTime(){ return this.secondsToMinutes(Math.floor(this.getLoopStart))},
    showLoopMessage(){
      return !this.isValidLoop ? 'No Loop Set' : this.looping ? 'Currently Looping': 'Loop Set'
    },
    isStartSet() {
      return this.start > -1 ? "green" : "primary";
    },
    isStopSet() {
      return this.stop > 1 ? "green" : "primary";
    },
    rotating() {
      return this.looping && this.isValidLoop
    }
  },
  methods: {
    seekTime(val) {
      return this.currentTime + val;
    },
    // toggleLooping(val) {
    //   this.looping = val ? val : !this.looping;
    // }
  }
};
</script>

<style lang="scss" scoped>
.rotate {
  display: inline-block !important;
  animation: rotation 10s infinite linear !important;
}
@keyframes rotation {
  50% {
    transform: rotate(720deg);
  }
  100% {
    transform: rotate(-720deg);
  }
}
</style>
