import Vue  from "vue";
export const loop_funcs = {
  data: () => ({ activeList: {}}),
  created() {
    if (this.loopArray.length) {
      for (let [k, v] of Object.entries(this.loopArray)) {
        const loop = v;
        const key = this.getActiveItemName(loop);
        this.activeList[key] = false;
        // console.log('loop', key, loop);
      }
      Vue.set(this, "activeList", this.activeList);
    }
  },
  methods: {
    getItemID(l, i) {
      return this.getActiveItemName(l) + this.collectionID + i;
    },
    active(loop) {
      return this.activeList[this.getActiveItemName(loop)];
    },
    getActiveItemName(val) {
      return this.getItemName(val) + "_active";
    },
    toggleActive(loop, i) {
      this.$nextTick(() => {
        const itm = this.getActiveItemName(loop);
        console.log("toggle from", itm, this.activeList[itm]);
        this.activeList[itm] = !this.activeList[itm];
        console.log("toggle to", itm, this.activeList[itm]);
      });
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
