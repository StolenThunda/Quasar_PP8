<template>
  <q-card>
      <result-panel v-model="search_entries" :resultList="search_entries">
        <template #title v-if="search_entries">Search Results: </template>
      </result-panel>
      <result-panel v-if="search_entries === null" :resultList="default_browser_entries">
        <template #title>Latest Additions:</template> 
      </result-panel>
  </q-card>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("browser");

export default {
  name: "Browser",
  components: {
    ResultPanel: () => import("components/browse/BrowserResultItems")
  },
  mounted() {
    this.loadDefaults();
  },
  computed: {
    ...mapState(["default_browser_entries", "search_entries"])
  },
  methods: {
    ...mapActions({
      loadDefaults: "fetchDefaultSearch"
    })
  }
};
</script>