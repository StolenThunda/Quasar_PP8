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
      <q-list class="q-pa-md ">
        <q-item-label class="text-secondary">Options</q-item-label>
        <q-separator />
        <section v-show="knobs">
          <q-item>
            <q-item-section>
              <q-badge
                color="secondary"
                :label="'Volume: ' + playerSettings.volume + '%'"
              />
              <q-knob
                show-value
                class="text-white q-ma-md"
                v-model="playerSettings.volume"
                size="65px"
                :angle="270"
                :thickness="0.15"
                color="accent"
                track-color="transparent"
                center-color="secondary"
              >
                <q-icon name="volume_up" class="q-mr-xs" />
                {{ playerSettings.volume }}%
              </q-knob>
            </q-item-section>
          </q-item>
          <!-- <q-item>
            <q-item-section>
              <q-badge
                color="secondary"
                :label="'Playback Speed: ' + playerSettings.speed + '%'"
              />
              <q-knob
                show-value
                class="text-white q-ma-md"
                v-model="playerSettings.speed"
                size="50px"
                :thickness="0.2"
                color="accent"
                track-color="transparent"
                center-color="secondary"
              >
                <q-icon name="mdi-play-speed" />
              </q-knob>
            </q-item-section>
          </q-item> -->
        </section>
        <section v-show="!knobs">
          <q-item>
            <q-item-section avatar class="text-secondary flex flex-center">
                Volume:
                <q-icon color="secondary" name="volume_up" title="Volume" />
            </q-item-section>
            <q-item-section class="col-5">
              <q-slider
                v-model="playerSettings.volume"
                :min="0"
                :max="100"
                :step="10"
                color="secondary"
                @change="volumeChange"
              /> {{ playerSettings.volume }}%
            </q-item-section>
          </q-item>
        </section>
        <q-item>
          <q-item-section avatar class="text-secondary flex flex-center"> 
              Speed: 
              <q-icon name="mdi-play-speed" color="secondary" title="Speed" />
          </q-item-section>
          <q-item-section>
            <q-slider
              v-model="playerSettings.speed"
              :min="50"
              :max="150"
              :step="25"
              color="secondary"
              @change="speedChange"
            />{{ playerSettings.speed }}%
          </q-item-section>
        </q-item>

        <section>
          <!-- <q-item tag="label" v-ripple>
            <q-item-section avatar>
              <q-checkbox
                color="secondary"
                v-model="playerSettings.zoomEnabled"
                @input="zoomChange"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label>Pan/Zoom</q-item-label>
            
              <q-btn
                v-show="playerSettings.zoomEnabled"
                color="secondary"
                label="Reset"
                @click="resetZoom"
              >
              </q-btn>
            </q-item-section>
          </q-item> -->
          <!--<q-item v-show="playerSettings.zoomEnabled">
          <q-item-section>
            <q-slider
              v-model="playerSettings.zoom"
              :min="1"
              :max="4"
              :step="0.005"
              label
              color="secondary"
              @change="zoomChange"
            />
          </q-item-section>
        </q-item> -->

          <q-item class="q-py-md">
            <q-item-section>
              <q-item-label class="text-secondary">Lefty View</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-toggle
                icon="mdi-hand-left"
                color="secondary"
                v-model="playerSettings.flipped"
                unchecked-icon="clear"
              />
            </q-item-section>
          </q-item>
          <!-- <q-item class="q-py-md">
            <q-item-section avatar>
              <q-checkbox color="secondary" v-model="knobs" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-secondary">Knob Layout</q-item-label>
            </q-item-section>
          </q-item> -->
        </section>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "VideoSettings",
  data: () => ({
    knobs: false
  }),
  computed: {
    ...mapState("watch", ["playerSettings"])
  },
  methods: {
    speedChange(v) {
      this.$root.$emit("speed", v);
    },
    volumeChange(v) {
      this.$root.$emit("volume", v);
    },
    resetZoom(v) {
      this.$root.$emit("resetZoom", v);
    },
    zoomChange(v) {
      this.$root.$emit("zoom", v);
    },
    toggleFlip(v) {

    }, 
    ...mapActions("watch", ["flipPlayer"])
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
