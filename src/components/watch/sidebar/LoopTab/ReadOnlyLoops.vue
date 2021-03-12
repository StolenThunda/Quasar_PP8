<template>
  <div v-if="ProPlayer.theSegment">
    <loop-list v-if="TXBALoops" v-bind="loopData" />
    <member-loop-list v-else v-bind="loopData" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import LoopList from "./LoopList.vue";
import MemberLoopList  from "./MemberLoopList.vue";
export default {
  name: "ReadOnlyLoops",
  props: {
    TXBALoops: {
      type: Boolean,
      default: false
    }
  },
  components: { LoopList, MemberLoopList },
  computed: {
    loopData() {
      const msg = this.TXBALoops
        ? "This item does not have any instant loops."
        : "There are no community loops for this item.";
      const loops = this.TXBALoops
        ? this.ProPlayer.theSegment.getLoopsArray() || []
        : this.userLoops?.memberLoopCollections
        ? this.userLoops.memberLoopCollections.filter((objLoop) => objLoop.memberLoops.length) // no empty list
        : [];
      // console.log("setting loopdata", loops);
      return {
        altMessage: msg,
        loopArray: loops,
        collectionID: this.TXBALoops ? 0 : 2
      };
    },
    ...mapState("watch", ["ProPlayer", "userLoops"])
  }
};
</script>
