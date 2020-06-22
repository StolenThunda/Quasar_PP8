<template>
  <v-tabs v-model="sections" centered grow icons-and-text>
    <v-tabs-slider></v-tabs-slider>

    <v-tab>
      segments
      <v-icon>
        fa fa-server
      </v-icon>
    </v-tab>
    <v-tab left>
      Favorites
      <q-icon name="heart</v-icon>
    </v-tab>

    <v-tab-item>
      <v-card v-for="i in playSections" :key="i.sectionID">
        <segments :segments="i.segments" :title="i.sectionTitle" />
      </v-card>
    </v-tab-item>
    <v-tab-item>
      <favorites />
    </v-tab-item>
  </v-tabs>
</template>

<script>
import Segments from "../components/proplayer/Segments";
import Favs from "../components/index/FavoritesList";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapGetters } = createNamespacedHelpers("watch");
export default {
  name: "PlayerSideBarTabs",
  data: () => ({
    tab: true,
    sections: null
  }),
  mounted() {
    this.fetchSections();
  },
  computed: {
    ...mapState(["playSections"])
  },
  components: {
    favorites: Favs,
    segments: Segments
  },

  methods: {
    fetchSections() {
      this.sections = this.getPlaySections();
    },
    ...mapGetters(["getPlaySections"])
  }
};
</script>
