<template>
  <v-card @toggleCourseInfo.stop="show = !show">
    <v-card-text>
      <course-info />
    </v-card-text>
  </v-card>
</template>

<script>
import CourseInfo from "../components/proplayer/CourseInfo";
export default {
  name: "PackageInfo",
  components: {
    "course-info": CourseInfo
  },
  mounted() {
    this.$root.$emit("toggleSidebar");
  },
  computed: {
    display(objCourse) {
      return JSON.stringify(objCourse, null, 4);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "//unpkg.com/video.js@7/dist/video-js.min.css";
// @import "//vjs.zencdn.net/7.7.5/video-js.css";
/* City */
@import "//unpkg.com/@videojs/themes@1/dist/city/index.css";
</style>
