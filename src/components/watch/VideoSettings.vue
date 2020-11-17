<template>
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
                <q-item tag="label" v-ripple>
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
</template>

<script>
export default {
  name: 'VideoSettings',
  props: [ 
    player
  ],
  data () {
    return {
      lefty: false
    }
  },
  methods: {
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
}
</script>
