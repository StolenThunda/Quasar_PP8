<template>
  <filter-section-list>
    <section v-show="searching">
      <details>
        <summary>Filters (chip data)</summary>
        <pre>{{ liveSearch }}</pre>
      </details>
      <q-chip
        v-for="item in liveSearch"
        :key="item.sync + componentKey"
        removable
        outline
        dense
        @remove="deleteFilter(item)"
      >
        {{ item.text }}
      </q-chip>
    </section>
  </filter-section-list>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("browser");
export default {
  name: "SearchIndicator",
  components: {
    FilterSectionList: () => import("components/browse/FilterSectionList")
  },
  data: () => ({
    componentKey: 0
  }),
  computed: {
    ...mapState(["searching", "liveSearch"])
  },
  watch: {
    searching() {
      this.filters = this.$store.getters["browser/getFilters"];
      console.log("forcing update");
      this.forceUpdate();
    }
  },
  mounted() {
    // this.browserTool.buildFilterSectionData()
  },
  methods: {
    forceUpdate() {
      this.componentKey += 1;
    },
    deleteFilter(data) {
      return this.removeFilter(data);
    },
    ...mapActions(["removeFilter"])
  }
};
</script>
