<template>
  <v-tabs v-model="tab" icons-and-text centered>
    <v-tabs-slider></v-tabs-slider>
    <v-tab href="#favorites">
      Favorites
      <q-icon name="heart</v-icon>
    </v-tab>
    <v-tabs-items v-model="tab">
      <FavList />
    </v-tabs-items>
  </v-tabs>
</template>

<script>
import FavList from "../components/index/FavoritesList";
export default {
  name: "defaultSidebar",
  components: {
    FavList
  },
  data: () => ({ tab: true })
};
</script>
