<template>
    <q-banner 
      class="container q-ma-lg text-thin" bordered
      v-model="currentCourse" 
      :set="(s = getCourseInfo)"
    >
    <center><q-btn color="secondary" icon="close" label="Close" @click="$emit('closeInfo')"></q-btn></center>
      <sup>Tuning: {{ s.tuning }} </sup>
      <hr />
      <div class="text-center text-bold" v-html="s.description"></div>
      <hr />
      <blockquote class="text-subtitle2" v-html="s.overview"></blockquote>
      <hr />
    </q-banner>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("watch");
export default {
  name: "CourseInfo",
  data: () => ({
    expand: false,
    player: null
  }),
  computed: {
    getCourseInfo() {
      return {
        title: this.currentCourse?.packageTitle,
        image: this.currentCourse?.packageImage,
        overview: this.currentCourse?.packageOverview,
        description: this.currentCourse?.packageDescription,
        tuning: this.currentCourse?.packageTuning,
      };
    },
    ...mapState(["currentCourse"])
  },
  methods: {
    test() {
      console.log("CurrCourse", this.currentCourse);
    }
  }
};
</script>
<style lang="stylus" scoped>
.container
  border: 1px solid #555
  background-color: rgba(84, 84, 84, 0.44)
</style>