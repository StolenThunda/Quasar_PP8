<template>
  <div v-if="currentSegment">
    <loop-list v-bind="loopData" />
  </div>
</template>

<script>
import LoopList from "./LoopList";
import { mapState } from "vuex";
export default {
  name: "ReadOnlyLoops",
  props: {
    TXBALoops: {
      type: Boolean,
      default: false
    }
  },
  components: {
    LoopList
  },
  computed: {
    loopData() {
      const msg = this.TXBALoops
        ? "This item does not have any instant loops."
        : "There are no community loops for this item.";
      const loops = this.TXBALoops
        ? this.currentSegment.getLoopsArray() || []
        : this.currentUserLoops.memberLoopCollections[0]?.memberLoops || [];
  const type = this.TXBALoops ? 0 : 2;
      return {
        altMessage: msg,
        loopArray: loops,
        listType: type
      };
    },
    ...mapState("watch", ["currentSegment", "currentUserLoops"])
  }
};
</script>

<style lang="scss" scoped></style>
