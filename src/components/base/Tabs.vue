<template>
  <v-sheet>
    <v-tabs v-model="tab" icons-and-text centered>
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#segments">
        Segments
        <q-icon name="menu</v-icon>
      </v-tab>
      <v-tab ref="favorites" href="#favorites">
        Favorites
        <q-icon name="heart</v-icon>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab" outlined>
      <v-tab-item id="segments">
        <segments />
      </v-tab-item>
      <v-tab-item id="favorites">
        <favorites />
      </v-tab-item>
    </v-tabs-items>
  </v-sheet>
</template>

<script>
import Segments from "../components/proplayer/Segments";
import Favs from "../components/index/FavoritesList";
export default {
  name: "PlayerTabs",
  data: () => ({
    tab: null
  }),
  components: {
    favorites: Favs,
    segments: Segments
  }
};
</script>
