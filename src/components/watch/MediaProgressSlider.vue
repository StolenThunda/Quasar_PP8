<template>
  <div id="progressSliderWrapper">
    <!-- <h1>HELLO</h1> -->
    <p>Current: {{ progress }}</p>
    <p>Duration: {{ remaining }}</p>
    <div id="current-time">{{ HHMMSSTime }}</div>
    <div id="time-left">{{ timeLeft}}</div>
    <div id="progressSlider">
      <q-slider
        v-model="progress"
        :min="0"
        :max="remaining"
        :label-value="HHMMSSTime"
        label
        color="secondary"
        @change="sliderChanged"
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
  mounted() { this.progress = this.ctime },
  computed: {
    HHMMSSTime() {
      return this.secondsToMinutes(this.ctime)
    },
    timeLeft() {
      const timeLeft = this.secondsToMinutes(this.duration - this.ctime);
      // this.remaining = timeLeft;
      console.log("tL", timeLeft);
      return timeLeft;
    }
  },
  watch: {
    ctime: function(val) {
      console.log('ctime changed', val)
      this.progress = this.ctime
    }
  },
  methods: {
    init() {
      this.timeLeft(0);
    },
    secondsToMinutes(sec) {
      sec = Number(sec);
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
      console.log("sliderChanged", e);
      this.progress = e;
      this.$root.$emit("progress-val", e  );
    },
    sliderSliding(e) {
      console.log("sliderSliding", e);
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
