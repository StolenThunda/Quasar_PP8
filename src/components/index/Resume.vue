<template>
<div>

  <q-card color="grey" class="container q-ma-lg" v-if="currentCourse" bordered>
    <q-card-section>
      <center>

        <q-btn label="Resume" :to="'/watch/' + currentCourse.packageID" icon="play_circle_outlined" color="secondary" />
      </center>
      <center class="q-pa-md">
        <span class="text-weight-bold text-subtitle2" v-html="currentCourse.packageTitle"></span>
      </center>
    </q-card-section>
  </q-card>
</div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ResumeLast",
  computed: {
    ...mapState('watch',['currentCourse'])
  }
//   props: {
//     course: String,
//     title: {
//       type: String,
//       default: "Albert’s Influence: Rockin Blues: Lesson 2 - Demonstration"
//     }
//   }
};
</script>

<style lang="stylus" scoped>
.container
   border: 1px solid #555
   background-color: rgba(84, 84, 84, 0.44)
</style>
