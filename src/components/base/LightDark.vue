<template>
  <v-list-item @click="toggleLightDark">
    <v-avatar v-if="show">
      <v-icon>fas fa-moon</v-icon>
    </v-avatar>
    <v-avatar v-else>
      <v-icon>fas fa-sun</v-icon>
    </v-avatar>
    <v-list-item-content>
      Light/Dark Mode
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  data: () => ({
    show: false
  }),
  methods: {
    toggleLightDark() {
      this.show = !this.show;
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    }
  }
};
</script>
