<template>
  <div >
    <q-expansion-item
    :label="memberLoop.memberName"
    v-for="memberLoop in loopArray"
    :key="memberLoop"
    >
      <loop-list
        v-if="memberLoop.memberLoops.length"
        :loopArray="memberLoop.memberLoops"
        :altMessage="altMessage"
        :collectionID="collectionID"
      />
    </q-expansion-item>

  </div>
</template>

<script>
import LoopList from './LoopList.vue';
export default {
  name: "MemberLoopList",
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
    },
    member: {
      type: String,
      default: ""
    }
  },
  components: {
    LoopList
  }
};
</script>

<style lang="scss" scoped></style>
