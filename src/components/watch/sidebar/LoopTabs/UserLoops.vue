<template>
  <div>
    <loop-list v-bind="loopData" />
  </div>
</template>

<script>
import LoopList from './LoopList'
import { mapState } from 'vuex';
  export default {
    name: 'UserLoops',
    data: () => ({ altMessage : 'You have not created any custom loops for this item.'}),
    components: {
        LoopList
    }, 
    computed: {
      loopData() {
        return {
        altMessage: this.altMessage,
        loopsArray: this.currentSegment.getLoopsArray()
      }
      }, 
      ...mapState('watch', ['currentSegment'])
    }
  }
</script>

<style lang="scss" scoped>

</style>