<template>
  <div>
    <result-panel v-if="search_entries" :resultList="search_entries">
      <template #header-pages>
        <pagination v-model="search.pages.length" />
      </template>
      <template #footer-pages>
        <pagination v-model="search.pages.length" />
      </template>
    </result-panel>

    <result-panel
      v-else
      :resultList="default_browser_entries"
      title="Latest Additions:"
    >
      <!-- <template #title></template> -->
    </result-panel>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Browser",
  components: {
    ResultPanel: () => import("components/browse/BrowserResultItems"),
    Pagination: () => import("components/browse/BrowserPagination")
  },
  computed: {
    ...mapState('browser', ["default_browser_entries", "search_entries", "search"])
  },
};
</script>
