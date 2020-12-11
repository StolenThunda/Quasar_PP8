<template>
  <div>
    <q-toolbar class="bg-primary text-capitalize  shadow-2 tab-title" >
      <q-toolbar-title class="text-capitalize text-caption">Instant Loops</q-toolbar-title>
    </q-toolbar>
    <loop-tabs :tabList="tabs" />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "LoopManager",
  data: () => ({
    active: false,
    tabs: [
      {
        name: "TXBA",
        componentName: "TXBA Loops",
        props: {TXBALoops: true },
        cmp: () => import("./ReadOnlyLoops")
      },
      {
        name: "Yours",
        componentName: "Your Loops",
        icon: "",
        cmp: () => import("./UserLoops")
      },
      {
        name: "Locals",
        componentName: "Locals Loops",
        // props: {admin: false },
        cmp: () => import("./ReadOnlyLoops")
      }
      ]
  }),
  components: {
    loopTabs: () => import("../../../../components/base/DynamicTab")
  },
  computed: {
    ...mapState("watch", ["currentSegment"])
  }
};
</script>

<style lang="scss">
.tab-title {
  min-height: 25px !important;
}
</style>
