<template>
  <q-card class="q-gutter-xs"  flat>
    <result-panel v-model="search_entries" :resultList="search_entries">
      <template #title>
        <current-search />
      </template>
      <template #header-pages>
        <pagination v-model="search.pages.length" />
      </template>
      <template #footer-pages>
        <pagination v-model="search.pages.length" />
      </template>
    </result-panel>

    <result-panel
      v-if="search_entries === null"
      :resultList="default_browser_entries"
    >
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
    ResultPanel: () => import("components/browse/BrowserResultItems"),
    CurrentSearch: () => import("components/browse/CurrentSearch"),
    Pagination: () => import("components/browse/BrowserPagination")
  },
  mounted() {
    this.loadDefaults();
  },
  computed: {
    ...mapState(["default_browser_entries", "search_entries", "search"])
  },
  methods: {
    ...mapActions({
      loadDefaults: "fetchDefaultSearch"
    })
  }
};
</script>
