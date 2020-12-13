<template>
  <div>
    <!-- <q-item> -->
      <div class="row q-my-md justify-between">
        <q-input
          filled
          class="col"
          v-model="inputLoop"
          style="min-width:180px; height:20px;"
          :disable="!saveEnabled"
        />
      </div>
      <div class="row ">
        <!-- <div class=""> -->

        <q-btn
          label="Add"
          icon="mdi-plus"
          size="xs"
          dense
          style="width:50px"
          class="col"
          :color="addEnabled ? 'secondary' : 'primary'"
          :disable="!addEnabled"
        />
        <q-btn
          label="Save"
          icon="mdi-floppy"
          size="xs"
          dense
          style="width:50px"
          class=" col"
          :color="saveEnabled ? 'negative' : 'primary'"
          :disable="!saveEnabled"
        />
        </div>
      <!-- </div> -->
    <!-- </q-item> -->
    <loop-list v-bind="loopData" />
  </div>
</template>

<script>
import LoopList from "./LoopList";
import { mapState } from "vuex";
export default {
  name: "UserLoops",
  data: () => ({
    altMessage: "You have not created any custom loops for this item.",
    inputLoop: null,
    addEnabled: false,
    saveEnabled: false,
  }),
  components: {
    LoopList
  },
  created() {
    this.$root.$on("valid-loop", this.toggleAdd);
  },
  computed: {
    loopData() {
      return {
        altMessage: this.altMessage,
        loopsArray: this.currentSegment.getLoopsArray()
      };
    },
    ...mapState("watch", ["currentSegment"])
  },
  methods: {
    toggleAdd({status}) { 
      console.log('toggleAdd', status)
      this.addEnabled = status }
  }
};
</script>

<style lang="scss" scoped></style>
