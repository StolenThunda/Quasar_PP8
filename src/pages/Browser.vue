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

    <q-card v-if="!search_entries" class="q-ma-none q-pa-none" bordered>
      <q-card-section
        v-for="(k, i) in Object.keys(default_browser_entries)"
        :key="i"
      >
        <result-panel
          :resultList="default_browser_entries[k]"
          :title="k + ':'"
          :hideCurrent="true"
      /></q-card-section>
    </q-card>
  </div>
</template>

<script>
import ResultPanel from "components/browse/ResultItems"
import Pagination from "components/browse/Pagination"
import { mapState } from "vuex";
export default {
  name: "Browser",
  components: {
    ResultPanel,
    Pagination
  },
  computed: {
    ...mapState("browser", [
      "default_browser_entries",
      "search_entries",
      "search"
    ])
  }
};
</script>
