<template>
  <v-card v-model="this.search.categories">
    <v-sheet class="pa-4 lighten-2" v-if="this.search.criteria != null">
      <v-text-field
        label="Search"
        v-model="searchText"
        dark
        flat
        solo-inverted
        hide-details
        clearable
        clear-icon=" close-circle-outline"
      ></v-text-field>

      <v-checkbox
        v-model="caseSensitive"
        dark
        hide-details
        label="Case sensitive search"
      ></v-checkbox>
    </v-sheet>
    <v-expansion-panels>
      <v-expansion-panel
        v-for="criterion in this.search.criteria"
        :key="criterion.sectionId"
      >
        <v-expansion-panel-header
          class="capital"
          v-html="criterion.sectionId"
        ></v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-sheet elevation="10" class="pa-2">
            <v-chip-group active-class="primary--text" column>
              <v-chip
                @click="toggle(chip)"
                v-for="chip in criterion.chips"
                :key="chip.id"
                pill
                filter
                >{{ chip.text }}</v-chip
              >
            </v-chip-group>
          </v-sheet>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("browser");

export default {
  name: "BrowserSidebar",
  data: () => ({
    caseSensitive: null,
    searchText: null
  }),
  computed: {
    ...mapState(["search"])
  },
  // created(){
  //   this.setCriteria();
  // },
  methods: {
    toggle(chipData) {
      // console.log(chipData)
      this.toggleSearchCriteria(chipData);
      if (!this.isSearching) this.$root.$emit("toggleSearching");
    },
    ...mapActions(["toggleSearchCriteria", "setCriteria"])
  }
};
</script>

<style scoped>
.capital {
  text-transform: capitalize;
}
</style>
