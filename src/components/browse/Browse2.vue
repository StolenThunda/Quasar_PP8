<template>
  <v-card>
    <v-row>
      <v-col>
        <v-toolbar v-if="showCurrentSearches">
          <v-toolbar-title>Current Searches</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-chip-group v-model="this.search.searchCategories">
            <v-chip
              v-for="chip in this.search.searchCategories"
              :key="chip.text"
              pill
              close
              @click:close="toggle(chip)"
              >{{ chip.text }}</v-chip
            >
          </v-chip-group>
        </v-toolbar>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-sheet
          class="mx-auto"
          max-width="75vw"
          outlined
          v-if="this.default_browser_entries"
        >
          <v-list
            id="content"
            dense
            v-for="default_entry in this.default_browser_entries"
            :key="default_entry.id"
          >
            <ResultPanel v-bind="default_entry" />
          </v-list>
        </v-sheet>
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
const { mapState, mapActions, mapGetters } = createNamespacedHelpers("browser");

export default {
  name: "Browser",
  data: () => ({
    categories: null
  }),
  components: {
    ResultPanel
  },
  computed: {
    ...mapGetters(["showCurrentSearches"]),
    ...mapState(["search", "default_browser_entries"])
  },
  methods: {
    toggle(chip) {
      this.toggleSearchCriteria(chip);
    },
    ...mapActions(["toggleSearchCriteria"])
  }
};
</script>

<style>
#content {
  display: flex;
  flex-direction: column;
  align-content: space-around;
  justify-content: center;
}
</style>
