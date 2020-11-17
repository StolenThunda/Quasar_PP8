<template>
  <div width="100%" height="100%">
    <q-card v-model="currentCourse" class="my-card" :set="(s = getCourseInfo)">
      <div class="text-h6" v-html="s.title"></div>
      <q-img :ratio="16 / 9" contain :src="s.image">
        <div class="text-bold text-center" v-html="s.description"></div>
        <div class="absolute-bottom">
          <div class="text-body2" v-html="s.overview"></div>
        </div>
        <template v-slot:loading>
          <q-spinner-bars color="white" />
        </template>
      </q-img>
    </q-card>
  </div>
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
  }
};
</script>
