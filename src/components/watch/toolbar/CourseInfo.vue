<template>
  <q-banner
    class="container q-ma-lg text-thin"
    bordered
    v-model="ProPlayer.thePackage"
  >
    <q-scroll-area style="height: 90vh;">
      <div class="row item-start ">
        <div class="col text-subtitle2 q-pa-md">
          <div>Tuning: {{ tuning }}</div>
          <div v-if="description !== ''" v-html="description" />
          <div v-if="overview !== ''" v-html="overview" />
        </div>
      </div>
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab color="secondary" icon="close" @click="$emit('closeInfo')" />
      </q-page-sticky>
    </q-scroll-area>
  </q-banner>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("watch");
export default {
  name: "CourseInfo",
  computed: {
    tuning() {
      return this.ProPlayer.thePackage.getTuning();
    },
    description() {
      return this.ProPlayer.thePackage.getDescription();
    },
    overview() {
      return this.ProPlayer.thePackage.getOverview();
    },
    ...mapState(["currentCourse", "ProPlayer"])
  }
};
</script>
<style lang="stylus" scoped>
.container
  border: 1px solid #555
  background-color: rgba(84, 84, 84, 0.44)
</style>
