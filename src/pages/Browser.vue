<template>
  <q-card class="q-gutter-xs">
    <result-panel v-model="search_entries" :resultList="search_entries">
      <!-- <template #title v-if="search_entries">Search Results: </template> -->
      <template #title>
        <q-banner v-show="search.current.length">
                  <div class="q-mt-sm"><p>Filters: {{ selection }}</p>
          <q-chip
            v-for="chip in search.current"
            :id="chip.name + '__' + chip.id"
            :key="chip.text"
            removable
            outline
            @remove="removeFilter(chip)"
          >
            {{ chip.text }}
          </q-chip>
          </div>
        </q-banner>
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
    ResultPanel: () => import("components/browse/BrowserResultItems")
  },
  mounted() {
    this.loadDefaults();
  },
  computed: {
    selection() {
      return Object.keys(this.search.status)
        .filter(chip => this.search.status[chip] === true)
        .join(", ");
    },
    ...mapState(["default_browser_entries", "search_entries", "search"])
  },
  methods: {
    ...mapActions({
      loadDefaults: "fetchDefaultSearch",
      removeFilter: "removeFilter"
    })
  }
};
</script>
