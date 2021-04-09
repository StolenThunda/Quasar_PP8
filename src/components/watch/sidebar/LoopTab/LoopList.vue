<template>
  <q-list
      v-if="activeList"
      bordered separator dense
      class="q-mr-xs"
  >
    <LoopListItem
      v-for="(item, i) in Object.entries(loopArray)"
      :set="(loop = loopArray[i])"
      :loop="loop"
      :index="i"
      :key="i + componentKey"
      :active="isActive(loop)"
    />
  </q-list>
</template>

<script>
// import { loop_funcs } from "src/mixins/loop_funcs";
import Vue from "vue";
import LoopListItem from "./LoopListItem.vue";
export default {
  // mixins: [loop_funcs],
  name: "LoopList",
  data: () => ({ activeList: {}, componentKey: 0 }),
  props: {
    loopArray: {
      type: Array,
      default: () => []
    },
    altMessage: {
      type: String,
      default: "No Alt Message or Data"
    },
    collectionID: {
      type: Number,
      default: () => 0
    }
  },
  components: {
    LoopListItem
  },
  created() {
    if (this.loopArray?.length) {
      for (let [k, v] of Object.entries(this.loopArray)) {
        const loop = v;
        const key = this.getActiveItemName(loop);
        this.activeList[key] = false;
        // console.log('loop', key, loop);
      }
      Vue.set(this, "activeList", this.activeList);
    }
    this.$root.$on('loop-cleared', this.clearAllLoops)
    this.$root.$on("activate", this.active);
    this.$root.$on("get-item-id", this.getItemID);
    this.$root.$on("toggle-active", this.toggleActive);
  },
  methods: {
    clearAllLoops(){
      Object.entries(this.activeList).map((k, v) => {
        return this.activeList[k] = false
      })
    },
    getItemID({ loop, index }) {
      return this.getActiveItemName(loop) + this.collectionID + index;
    },
    isActive(loop) {
      const active = this.activeList[this.getActiveItemName(loop)];
      if (active){
        this.$root.$emit('set-loop', loop)
      }
      return active
    },
    getActiveItemName(val) {
      return this.getItemName(val) + "_active";
    },
    toggleActive(loop) {
      // this.$nextTick(() => {
        const itm = this.getActiveItemName(loop);
        console.log("toggle from", itm, this.activeList[itm]);
        this.activeList[itm] = !this.activeList[itm];
        console.log("toggle to", itm, this.activeList[itm]);
      // });
      this.componentKey++;
    },
    getItemName(val) {
      if (!val || !val[0]) return val;
      const name = val[0].replace(/\s/g, "") || "";
      // console.log("getIName", name);
      return name;
    }
  }
};
</script>
