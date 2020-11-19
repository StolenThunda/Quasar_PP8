<template>
  <q-btn
    id="controls-toggle"
    class="transport-button"
    title="Video Settings"
    icon="mdi-cogs"
  >
    <q-menu
      class="q-ma-lg"
      anchor="top left"
      self="bottom left"
      transition-show="flip-right"
      transition-hide="flip-left"
      fit
    >
      <q-list class="q-pa-md" dense>
        <!--  <q-item>
          <q-item-section avatar>
            <q-icon color="secondary" name="volume_up" title="Volume" />
          </q-item-section>
         <q-item-section>
            <q-slider
            
              :min="0"
              :max="1"
              :step="0.1"
              label
              color="secondary"
              @change="volumeChange"
            />
          </q-item-section>
        </q-item>
        <q-item tag="label" v-ripple>
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
              @change="zoomChange"
            />
          </q-item-section>
        </q-item>-->
        <q-item>
          <q-item-section avatar>
            <q-item-label>Speed</q-item-label>
            <q-icon name="mdi-play-speed" color="secondary" title="Speed" />
          </q-item-section>
          <q-item-section>
            <q-slider
              v-model="playerSettings.speed"
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
        <q-item  class="q-py-md" >
          <q-item-section avatar>
            <q-checkbox color="secondary" v-model="playerSettings.flipped"  />
          </q-item-section>
          <q-item-section>
            <q-item-label>Lefty View</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "VideoSettings",
  inject: ["volume", "zoom", "speed"],
  computed: {
    ...mapState('watch', ['playerSettings']),
  //   flipped: {
  //     get() {
  //       return this.playerSettings.flipped
  //     },
  //     set(val){
  //       this.flipPlayer(val)
  //     }
  //   },
  //   speed: {
  //     get()
  //   }
  }, 
  data: () => ({
    videoZoomEnabled: false
  }),
  methods: {
    speedChange(v) {
      this.$root.$emit("speed", v);
    },
    volumeChange(v) {
      this.$root.$emit("volume", v);
    },
    zoomChange(v) {
      this.$root.$emit("zoom", v);
    },
    ...mapActions('watch', ['flipPlayer'])
  }
};
</script>

<style lang="scss" scoped>
.transport-button {
  width: 100%;
  // line-height: 2.5em;
  background: none;
  border: none;
  // font-size: 1rem;
  -webkit-font-smoothing: antialiased;
  color: white;
  text-align: center;
  // font-weight: 600;
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
</style>
