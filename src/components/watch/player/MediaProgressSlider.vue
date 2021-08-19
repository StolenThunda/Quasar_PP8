<template>
  <q-list id="progressSliderWrapper" dense>
    <q-item v-if="activeLoop">
      <q-item-section></q-item-section>
      <q-item-section side>
        <q-badge color="accent" transparent rounded>
          <span class="text-center">
            <span class="text-caption">
              Current Loop
            </span>
            <br />
            <span class="text-weight-bolder">
              Start: {{ minTime(Math.floor(getLoopStart)) }} to End:
              {{ maxTime(Math.floor(getLoopStop)) }}
            </span>
          </span>
        </q-badge>
      </q-item-section>
      <q-item-section></q-item-section> 
    </q-item>
    <q-item>
      <q-item-section
        id="current-time"
        class="text-weight-bolder text-caption"
        avatar
      >
        {{ elapsedTime }}
      </q-item-section>
      <q-item-section id="progressSlider">
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
          :left-label-value="minTime(activeLoop.min)"
          :right-label-value="maxTime(activeLoop.max)"
          readonly
        />
        <!-- </div> -->
        <!-- <div id="chapters-wrapper"></div> -->
      </q-item-section>
      <q-item-section
        id="time-left"
        class="text-weight-bolder text-caption"
        avatar
      >
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
  props: ["ctime"],
  mixins: [utilities],
  data: () => ({
    progress: 0.0
  }),
  mounted() {
    this.progress = this.ctime;
  },
  computed: {
    ...mapState("watch", ["playerSettings"]),
    ...mapGetters("watch", ["isValidLoop", "getLoopStart", "getLoopStop"]),
    duration() {
      return this.playerSettings.duration;
    },

    activeLoop() {
      return this.isValidLoop
        ? this.playerSettings.looping
          ? {
              min: Math.floor(this.ctime),
              max: Math.floor(this.getLoopStop)
            }
          : {
              min: Math.floor(this.getLoopStart),
              max: Math.floor(this.getLoopStop)
            }
        : null;
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
    minTime(time) {
      return this.secondsToMinutes(time);
    },
    maxTime(time) {
      return this.secondsToMinutes(time);
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
