<template>
  <div>Default
    <result-panel :resultList="default_browser_entries" />
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("browser");
export default {
  name: "BrowserDefaultResults",
  data: () => ({
    results: null
  }),
  components: {
    ResultPanel: () => import("components/browse/BrowserResultItems")
  },
  mounted() {
    this.loadDefaults();
  },
  computed: {
    ...mapState(["default_browser_entries", "search", "search_entries"])
  },
  methods: {
    loadDefaults() {
      this.results = this.fetchDefaultSearch();
      console.log(`defaults?: ${this.results}`)
   },
    ...mapActions(["fetchDefaultSearch"])
  }
};
</script>
<style scoped>
.browser-result-meta {
  font-size: 0.7em !important;
  font-weight: 700 !important;
  color: #aaa !important;
  margin-top: 0.25em !important;
}
.browser-result-meta .meta-wrapper {
  white-space: nowrap !important;
  margin-right: 0.5em !important;
}
.browser-result-meta .meta-key {
  text-transform: uppercase !important;
  color: white !important;
  font-weight: 900 !important;
  margin-right: 0.25em !important;
}
</style>
