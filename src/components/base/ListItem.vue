<template>
  <v-list-item>
    <v-img
      max-height="125"
      max-width="50"
      class="ma-5"
      :src="this.avatar"
      v-if="this.avatar"
      contain
    />
    <v-list-item-avatar v-else>
      <v-icon dense large> email</v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title v-html="this.title"></v-list-item-title>
      <v-list-item-subtitle v-html="this.subtitle"></v-list-item-subtitle>
      <v-container v-if="this.data" v-html="this.data"></v-container>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: "BaseListItem",
  data: () => ({
    show: false
  }),
  props: {
    avatar: String,
    data: String,
    subtitle: String,
    title: String,
    id: Number
  }
};
</script>

<style>
.v-icon {
  margin-right: 10px;
}
.browser-result-meta {
  font-size: 0.7em;
  font-weight: 700;
  color: #aaa;
  margin-top: 0.25em;
}

.meta-key {
  text-transform: uppercase;
  color: white;
  font-weight: 900;
  margin-right: 0.25em;
}

.meta-wrapper {
  white-space: nowrap;
  margin-right: 0.5em;
}
</style>
