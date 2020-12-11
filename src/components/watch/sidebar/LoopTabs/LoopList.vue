<template>
  <div>
    <q-list v-if="loopArray.length" bordered separator>
      <template v-for="loop in loopArray">
        <q-item
          clickable
          v-ripple
          active-class="text-orange"
          :id="getItemName(loop)"
          :key="getItemName(loop) + listType + componentKey"
          @click="toggleActive(loop)"
          :active="active(loop)"
        >
          <q-item-section avatar>
            <q-icon name="mdi-autorenew" />
          </q-item-section>
          <q-item-section class="text-center">
            <q-item-label>
              {{ loop[0] }}
            </q-item-label>
          </q-item-section>
          <q-item-section side avatar>
            <q-icon name="mdi-plus-circle" v-show="!active(loop)" />
            <q-icon name="mdi-check-circle" v-show="active(loop)" />
          </q-item-section>
        </q-item>
      </template>
    </q-list>
    <p v-else>{{ altMessage }}</p>
  </div>
</template>

<script>
export default {
  name: "LoopList",
  props: {
    loopArray: {
      type: Array,
      default: () => []
    },
    altMessage: {
      type: String,
      default: "No Alt Message or Data"
    },
    listType: {
      type: Number,
      default: () => 0
    }
  },
  data: () => ({ activeList: {}, componentKey: 0 }),
  created() {
    if (this.loopArray.length) {
      this.loopArray.map(loop => {
        const key = this.getActiveItemName(loop);
        this.activeList[key] = false;
        Object.assign({}, this, this.activeList);
      });
    }
  },
  methods: {
    active(loop) {
      const loopStatus = this.activeList[this.getActiveItemName(loop)];
      console.log("lstat", loopStatus);
      return loopStatus;
    },
    toggleActive(loop) {
      this.$nextTick(() => {
        const itm = this.getActiveItemName(loop);
        console.log("toggle from", itm, this.activeList[itm]);
        this.activeList[itm] = !this.activeList[itm];
        console.log("toggle to", itm, this.activeList[itm]);
      });
      this.componentKey++;
    },
    getActiveItemName(val) {
      return this.getItemName(val) + "_active";
    },
    getItemName(val) {
      const name = val[0].replace(/\s/g, "") || "";
      console.log("getIName", name);
      return name;
    }
  }
};
</script>

<style lang="scss" scoped></style>
