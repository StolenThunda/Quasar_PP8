<template>
  <div class="q-mt-sm">
    <q-banner v-show="searching">
      <p>
        Filters:
        <!-- <span class="text-capitalize text-subvalue2 text-justify"> -->
        <!-- {{ selection }} -->
        <!-- </span> -->
      </p>
        <!-- v-model="filters.length" -->
      <q-chip 
        v-for="chip in liveSearch"
        :key="chip.sync + componentKey"
        removable
        outline
        @remove="deleteFilter(chip)"
      >
        {{ chip.text }}
      </q-chip>
    </q-banner>
    <!-- <q-banner v-else-if="search && !currentFilters">Showing: ALL</q-banner> -->
  </div>
</template>

<script>
import Vue from 'vue'
import { createNamespacedHelpers } from "vuex";
const { mapActions,  mapGetters, mapState } = createNamespacedHelpers("browser");
export default {
  name: "CurrentSearchBanner",
  data: () => ({ filters: null, componentKey: 0 }),
  computed: {
    ...mapState(['searching', 'liveSearch']),
  },
  watch: {
    searching() {
        // this.filters = this.$store.getters['browser/getFilters'];
        // console.log('this.filters', this.filters)
        // this.forceUpdate()
    }
  },
  methods: {
    forceUpdate(){
      this.componentKey += 1;
    },
    deleteFilter(data) {``
      return this.removeFilter(data)
    },
    ...mapActions(["removeFilter"])
  }
};
</script>
