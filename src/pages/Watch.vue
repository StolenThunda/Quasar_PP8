<template>
  <q-card v-model="currentCourse" class=" q-pa-xl" :set="(s = getCourseInfo)">
    <div class="row">
      <div class="col-12 text-h6 text-center" v-html="s.description" />
    </div>
    <div class="row">
      <q-img
        contain
        class="col q-ma-md"
        :ratio="4 / 3"
        :src="s.image"
      >
        <template v-slot:loading>
          <q-spinner-bars color="white" />
        </template>
      </q-img>
      <div class="col" v-html="s.overview" />
    </div>
    <q-inner-loading>
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
  </q-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "PackageInfo",
  computed: {
    getCourseInfo() {
      return {
        title: this.currentCourse?.packageTitle,
        image: this.currentCourse?.packageImage,
        overview: this.currentCourse?.packageOverview,
        description: this.currentCourse?.packageDescription
      };
    },
    ...mapState("watch", ["currentCourse"])
  },
  watch:{
    currentCourse() {

    }
  }
};
</script>
