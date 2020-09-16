<template>
  <div class="q-mt-sm">
    <q-banner v-show="searching">
      <p>
        Filters:
        <!-- <span class="text-capitalize text-subvalue2 text-justify"> -->
        <!-- {{ selection }} -->
        <!-- </span> -->
      </p>
      <q-chip
        :set="(chips = getChips)"
        v-for="chip in getFilters()"
        :key="chip.sync"
        removable
        outline
        @remove="removeFilter(chip)"
      >
        {{ chip.text }}
      </q-chip>
    </q-banner>
    <!-- <q-banner v-else-if="search && !currentFilters">Showing: ALL</q-banner> -->
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions,  mapGetters, mapState } = createNamespacedHelpers("browser");
export default {
  name: "CurrentSearchBanner",
  // data: () => ({ filters: null }),
  computed: {
    ...mapState(['searching', 'filters']),
    // ...mapGetters(['getFilters']),
  },
  methods: {
    getChips(){
      Vue.set(vm.filters, 'filters', this.getFilters())
    },
    ...mapActions(["removeFilter"])
  }
};
</script>
