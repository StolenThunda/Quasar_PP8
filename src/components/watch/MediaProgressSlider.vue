<template>
  <div id="progressSliderWrapper"  class="q-pt-md ">
    <div class="fit row  items-center q-pb-xs">
      <div id="current-time" class="offset-3">{{ elapsedTime }}</div>
      <div id="time-left" class="offset-9">{{ timeLeft }}</div>
    </div>
    <div id="progressSlider">
      <q-slider
        v-model="progress"
        :min="0"
        :max="remaining"
        :label-value="elapsedTime"
        label
        color="secondary"
        @change="sliderChanged"
        dense
      @pan="sliderSliding"
      />
      <div id="loop-region" style="display: none"></div>
      <div id="chapters-wrapper"></div>
    </div>
  </div>
</template>

<script>
import { utilities } from "../../mixins/utilities";
export default {
  name: "MediaProgressSlider",
  props: ["remaining", "ctime"],
  mixins: [utilities],
  data: () => ({
    progress: 0.0
  }),
  mounted() {
    this.progress = this.ctime;
  },
  computed: {
    elapsedTime() { return this.secondsToMinutes(this.progress)},
    timeLeft() { return this.secondsToMinutes(this.remaining - this.progress)}, 
  },
  watch: {
    ctime: function(val) { this.progress = val },
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

<style lang="scss" scoped>
#current-time {
  position: absolute !important;
  float: left !important;
  margin-left: 1em !important;
}
#time-left {
  position: absolute !important;
  float: right !important;
  margin-right: 1em !important;
}
</style>
