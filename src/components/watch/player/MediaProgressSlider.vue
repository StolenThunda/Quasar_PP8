<template>
  <q-list id="progressSliderWrapper">
    <q-item class="row">
      <q-item-section
        id="current-time"
        class="q-px-xl col-2 text-weight-bolder text-caption"
      >
        {{ elapsedTime }}
      </q-item-section>
      <q-item-section id="progressSlider" class="col-8">
        <q-slider
          dense
          label
          v-if="!activeLoop"
          v-model="progress"
          color="secondary"
          :min="ctime"
          :max="duration"
          :label-value="elapsedTime"
          @change="sliderChanged"
          @pan="sliderSliding"
        />
        <!-- <div > -->
        <q-range
          id="loop-region"
          v-else
          color="accent"
          v-model="activeLoop"
          dense
          label
          readonly
        />
        <!-- </div> -->
        <!-- <div id="chapters-wrapper"></div> -->
      </q-item-section>
      <q-item-section id="time-left" class="col-2 q-px-xl text-weight-bolder text-caption">
        {{ timeLeft }}
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { utilities } from "../../../mixins/utilities";
export default {
  name: "MediaProgressSlider",
  props: [ "ctime"],
  mixins: [utilities],
  data: () => ({
    progress: 0.0
  }),
  mounted() {
    this.progress = this.ctime;
  },
  computed: {
    ...mapState('watch' ,['playerSettings']),
    ...mapGetters('watch',['isValidLoop', 'getLoopStart', 'getLoopStop']),
    duration(){ return this.playerSettings.duration },
    activeLoop(){
      return this.isValidLoop ? {
        min: Math.floor(this.getLoopStart),
        max: Math.floor(this.getLoopStop)
      } : null
    }, 
    elapsedTime() {
      return this.secondsToMinutes(this.progress);
    },
    timeLeft() {
      return this.secondsToMinutes(this.duration - this.progress);
    }
  },
  watch: {
    ctime: function(val) {
      this.progress = val;
    }
  },
  methods: {
    sliderChanged(e) {
      this.$root.$emit("slider-change", e);
    },
    sliderSliding(e) {
      if (e === "start") this.$root.$emit("pause");
      console.log("sliderSliding", this.progress);
    }
  }
};
</script>
