<template>
  <v-card>
    <v-tabs
      v-model="tab"
      background-color="deep-purple accent-4"
      centered
      dark
      icons-and-text
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#tab-1">
        Recents
        <q-icon name="phone</v-icon>
      </v-tab>

      <v-tab href="#tab-2">
        Favorites
        <q-icon name="heart</v-icon>
      </v-tab>

      <v-tab href="#tab-3">
        Nearby
        <q-icon name="account-box</v-icon>
      </v-tab>
    </v-tabs>
  </v-card>
</template>

<script>
export default {
  name: "playerSideBar",
  data() {
    return {
      tab: null,
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  }
};
</script>

<style lang="scss" scoped></style>
