<template>
  <q-card v-model="ProPlayer.thePackage" class=" q-pa-md">
    <div
      class="col-12 text-h4 text-center text-weight-bolder q-py-md"
      v-html="title"
    />
    <div class="row item-start q-px-xl">
      <div class="col text-caption q-pa-md">
        <div class="col text-h6" v-if="description" v-html="description" />
        <div class="text-caption" v-if="overview !== ''" v-html="overview" />
      </div>
      <q-img class="col fit q-ma-sm rounded-borders" :src="image" :ratio="4/3" contain>
        <template v-slot:loading>
          <q-spinner-bars color="white" />
        </template>
      </q-img>
    </div>
    <div class="">
      <q-avatar icon="mdi-arrow-left-bold" />
      Choose a segment to the left
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
