<template>
  <v-card class="my-3 pa-2" elevation="15" outlined>
    <v-row>
      <v-col cols="1">
        <div class="d-flex flex-no-wrap justify-start">
          <v-list-item-avatar>
            <v-icon dense large>mdi-email</v-icon>
          </v-list-item-avatar>
        </div>
      </v-col>
      <v-col class="mb-auto">
        <v-card-title>{{ this.title }}</v-card-title>
        <v-card-subtitle>
          {{ this.subtitle }}
          <router-link v-if="this.action" :to="this.action">{{
            this.actionText
          }}</router-link>
        </v-card-subtitle>
        <v-container v-if="this.data" v-html="this.data"></v-container>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
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
  }
};
</script>

<style scoped>
.v-card-title {
  font-size: 0.85em;
  text-transform: uppercase;
  font-weight: 900;
  color: white;
}
</style>
