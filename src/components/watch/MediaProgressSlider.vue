<template>
  <q-list id="progressSliderWrapper">
    <q-item class="row">
      <q-item-section
        id="current-time"
        class="q-pl-md col-1 text-weight-bolder text-caption"
      >
        {{ elapsedTime }}
      </q-item-section>
      <q-item-section id="progressSlider" class="col-10">
        <q-slider
          dense
          label
          v-if="!activeLoop"
          v-model="progress"
          color="secondary"
          :min="0"
          :max="remaining"
          :label-value="elapsedTime"
          @change="sliderChanged"
          @pan="sliderSliding"
        />
        <!-- <div > -->
        <q-range
          id="loop-region"
          dense
          label
          color="secondary"
          v-else
          :min="0"
          :max="remaining"
          v-model="activeLoop"
          readonly
        />
        <!-- </div> -->
        <!-- <div id="chapters-wrapper"></div> -->
      </q-item-section>
      <q-item-section id="time-left" class="col-1 q-pl-md text-weight-bolder text-caption">
        {{ timeLeft }}
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { utilities } from "../../mixins/utilities";
export default {
  name: "MediaProgressSlider",
  props: ["remaining", "ctime", "activeLoop"],
  mixins: [utilities],
  data: () => ({
    progress: 0.0
  }),
  mounted() {
    this.progress = this.ctime;
  },
  computed: {
    elapsedTime() {
      return this.secondsToMinutes(this.progress);
    },
    timeLeft() {
      return this.secondsToMinutes(this.remaining - this.progress);
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
