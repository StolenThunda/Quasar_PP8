<template>
  <q-banner
    class="container q-ma-lg text-thin"
    bordered
    v-model="ProPlayer.thePackage"
  >
    <center>
      <q-btn
        color="secondary"
        icon="close"
        label="Close"
        @click="$emit('closeInfo')"
      ></q-btn>
    </center>
    <sup>Tuning: {{ tuning }} </sup>
    <hr />
    <div
      class="text-center text-bold"
      :v-html="description"
    ></div>
    <hr />
    <blockquote
      class="text-subtitle2"
      :v-html="overview"
    ></blockquote>
    <hr />
  </q-banner>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("watch");
export default {
  name: "CourseInfo",
  computed: {
    tuning() { return this.ProPlayer.thePackage.getTuning() },
    description() { return this.ProPlayer.thePackage.getDescription()},
    overview() { return this.ProPlayer.thePackage.getOverview()},
    ...mapState(["currentCourse", "ProPlayer"])
  }
};
</script>
<style lang="stylus" scoped>
.container
  border: 1px solid #555
  background-color: rgba(84, 84, 84, 0.44)
</style>
