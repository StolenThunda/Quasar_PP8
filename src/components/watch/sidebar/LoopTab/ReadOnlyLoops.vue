<template>
  <div v-if="ProPlayer.theSegment">
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
  components: { LoopList },
  computed: {
    loopData() {
      console.log('setting loopdata')
      const msg = this.TXBALoops
        ? "This item does not have any instant loops."
        : "There are no community loops for this item.";
      const loops = this.TXBALoops
        ? this.ProPlayer.theSegment.getLoopsArray() || []
        : this.currentUserLoops.memberLoopCollections[0]?.memberLoops
        ? this.currentUserLoops.memberLoopCollections[0].memberLoops
        : [];
      return {
        altMessage: msg,
        loopArray: loops,
        collectionID: this.TXBALoops ? 0 : 2
      };
    },
    ...mapState("watch", ["ProPlayer", "currentUserLoops"])
  }
};
</script>
