<template>
  <q-card>
    <q-card-section v-if="isLoaded">
      <result-panel :resultList="this.search_entries">
        <template #title>Search Results: {{ currentCategory }}</template>
      </result-panel>
    </q-card-section>
    <q-card-section v-else>
      <result-panel :resultList="this.default_browser_entries">
        <template #title>Latest Additions:</template> </result-panel
      >
    </q-card-section>
  </q-card>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("browser");

export default {
  name: "Browser",
  data: () => ({
    categories: ""
  }),
  components: {
    ResultPanel: () => import("components/browse/BrowserResultItems")
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
    ...mapState(["default_browser_entries", "search", "search_entries", "currentCategory"])
  },
  methods: {
    categoryChange(category) {
      console.log(`Changing Cat: ${category}`)
      this.categories = category
    },
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
