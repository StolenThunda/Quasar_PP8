<template>
  <q-card v-model="ProPlayer.thePackage" class=" q-pa-md">
    <div class="row item-start ">
      <q-img  class="col fit" :src="image">
        <template v-slot:loading>
          <q-spinner-bars color="white" />
        </template>
      </q-img>
      <div
        class="col text-h6 text-center q-pa-md"
        v-html="overview"
        v-if="overview !== ''"
      >
        Tuning: {{ tuning }}
      </div>
      <div class="col text-h6 text-center" v-else>
        <p>Tuning: {{ tuning }}</p>
        <p>
          <!-- <q-avatar icon="mdi-arrow-left-bold" />  -->
          <q-avatar color="secondary" icon="mdi-chevron-left" />
          Choose a segment to the left
        </p>
      </div>
    </div>

    <q-inner-loading>
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
  </q-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "PackageInfo",
  computed: {
    title() {
      return this.ProPlayer.thePackage.getTitle();
    },
    image() {
      return this.ProPlayer.thePackage.getImageURL();
    },
    tuning() {
      return this.ProPlayer.thePackage.getTuning();
    },
    description() {
      return this.ProPlayer.thePackage.getDescription();
    },
    overview() {
      return this.ProPlayer.thePackage.getOverview();
    },
    ...mapState("watch", ["ProPlayer"])
  }
};
</script>
