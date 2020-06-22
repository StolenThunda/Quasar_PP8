<template>
  <v-toolbar>
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
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("browser");

export default {
  computed: {
    ...mapState(["search"])
  },
  methods: {
    toggle(chip) {
      this.toggleSearchCriteria(chip);
    },
    ...mapActions(["toggleSearchCriteria"])
  }
};
</script>

<style lang="scss" scoped></style>
