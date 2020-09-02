<template>
  <q-card class="q q-ma-xs" color="grey" bordered>
    <q-card-section horizontal>
      <q-card-section>
        <q-avatar icon="email" size="xl" />
      </q-card-section>
      <q-card-section class="q-pt-xs">
        <div class="text-uppercase text-body2 text-weight-bolder">
          {{ this.title }}
        </div>
        <div class="text-bold text-grey">
          {{ this.subtitle }}
        </div>

        <q-btn
          v-if="this.action"
          @click="this.send(this.action)"
          text-color="secondary"
          flat
        >
          {{ this.actionText }}
        </q-btn>
        <q-btn v-if="this.data" flat color="secondary">
          {{ this.data }}
        </q-btn>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script>
import openURL from "quasar";
export default {
  name: "BaseListItem",
  data: () => ({
    show: false
  }),
  props: {
    action: String,
    actionText: String,
    avatar: String,
    data: String,
    subtitle: String,
    title: String,
    id: Number
  },
  methods: {
    send(url) {
      console.dir(this);
      if (url !== null) window.location.href = url;
    }
  }
};
</script>

<style scoped></style>
