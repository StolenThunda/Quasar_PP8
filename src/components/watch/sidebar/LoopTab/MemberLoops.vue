<template>
  <div>
    <div v-if="loopArray.length">
        <!-- :set="(memberLoop = loopArray[i])" -->
      <q-expansion-item
        v-for="memberLoop in loopArray"
        :label="getMember(memberLoop)"
        :key="getMember(memberLoop) + idx++"
        :id="memberLoop"
        dense-toggle
        dense
        popup
      >
      <pre>{{ memberLoop }}</pre>
        <loop-list
          :loopArray="memberLoop.memberLoops"
          :altMessage="altMessage"
          :collectionID="collectionID"
        />
      </q-expansion-item>
    </div>
    <div v-else>
      {{ altMessage }}
    </div>
  </div>
</template>

<script>
import { loop_funcs } from "../../../../mixins/loop_funcs.js"
import LoopList from "./LoopList.vue";
export default {
  name: "MemberLoopList",
  mixins: [ loop_funcs ],
  data: () => ({ idx: 0 }),
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
  },
  methods:{
    getMember(objLoop){
      return objLoop?.memberName || ""
    }
  }
};
</script>

<style lang="scss" scoped></style>
