<template>
  <div id="progressSliderWrapper">
    <div class="q-pb-md">
      <div id="
      -time">{{ elapsedTime }}</div>
      <div id="time-left">{{ timeLeft }}</div>
    </div>
    <!-- <p>Current: {{ Math.round(progress) }}</p> -->
    <!-- <p>Duration: {{ remaining }}</p> -->

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
export default {
  name: "MediaProgressSlider",
  props: ["remaining", "ctime"],
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
    ctime: function(val) {
      console.log("slider ctime changed", val);
      this.progress = val;
    }
  },
  methods: {
    secondsToMinutes(sec) {
      sec = Math.round(Number(sec));
      var hours = Math.floor(sec / 3600);
      hours >= 1 ? (sec = sec - hours * 3600) : (hours = "00");
      var min = Math.floor(sec / 60);
      min >= 1 ? (sec = sec - min * 60) : (min = "00");
      sec < 1 ? (sec = "00") : void 0;

      min.toString().length == 1 ? (min = "0" + min) : void 0;
      sec.toString().length == 1 ? (sec = "0" + sec) : void 0;

      return hours + ":" + min + ":" + sec;
      console.log("strTime", strTime);
      return strTime;
    },
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
  float: left;
  margin-left: 1em;
}
#time-left {
  float: right;
  margin-right: 1em;
}
</style>
