<template>
  <v-card class="fill-height" align="center" justify="center">
    <v-row v-if="isLoaded">
      <v-col>
        <div
          id="content"
          dense
          v-for="search_entry in this.search_entries"
          :key="search_entry.id"
        >
          <ResultPanel v-bind="search_entry" />
        </div>
        <!-- </v-sheet> -->
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col>
        <v-row align="center" justify="center">
          <div width="50vw">
            <h1 class="pt-5 header">Latest Additions</h1>
            <v-carousel
              v-if="this.default_browser_entries"
              cycle
              hide-delimiter-background
              show-arrows-on-hover
              dak
            >
              <v-carousel-item
                height="100%"
                v-for="default_entry in this.default_browser_entries"
                :key="default_entry.id"
                reverse-transition="fade-transition"
                transition="fade-transition"
              >
                <v-sheet height="100%">
                  <ResultPanel v-bind="default_entry" />
                </v-sheet>
              </v-carousel-item>
            </v-carousel>
          </div>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
/*
TODO - enable/disable favorites

*/

import ResultPanel from "../components/browse/resultPanel";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("browser");

export default {
  name: "Browser",
  data: () => ({
    categories: null
  }),
  components: {
    ResultPanel
  },
  mounted() {
    this.loadDefaults();
  },
  computed: {
    isLoaded() {
      return this.search.criteria !== null;
    },
    dataTableEntries() {
      return this.getDTEntries;
    },
    ...mapState(["default_browser_entries", "search", "search_entries"])
  },
  methods: {
    ...mapActions({
      loadDefaults: "fetchDefaultSearch"
    })
  }
};
</script>

<style scoped>
.header {
  text-align: center !important;
}
</style>
