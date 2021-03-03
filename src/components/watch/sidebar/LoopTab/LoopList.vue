<template>
  <div>
    <q-list>
      <LoopListItem 
      v-for="(item, i) in Object.entries(loopArray)"
       :loop="loopArray[i]" 
       :key="i"
       >

      </LoopListItem>
       
    </q-list>
  </div>
</template>

<script>
import LoopListItem from "./LoopListItem.vue"
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
    collectionID: {
      type: Number,
      default: () => 0
    }
  },
  data: () => ({ activeList: {}, componentKey: 0 }),
  components: {
    LoopListItem
























  }
};
</script>
