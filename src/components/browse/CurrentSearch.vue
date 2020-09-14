<template>
    <div class="q-mt-sm">
  <q-banner v-if="search.current.length">
      <p>
        Filters:
        <span class="text-capitalize text-subvalue2 text-justify">
          {{ selection }}
        </span>
      </p>
      <q-chip
        v-for="chip in search.current"
        :key="chip.sync"
        removable
        outline
        @remove="removeFilter(chip)"
      >
        {{ chip.text }}
      </q-chip>
  </q-banner>
  <q-banner v-else>Showing: ALL</q-banner>
    </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("browser");
export default {
  name: "CurrentSearchBanner",
  computed: {
    selection() { return this.search.current.map(a => a.text).join(', ')},
      // return Object.keys(this.search.status)
      //   .filter(chip => this.search.status[chip] === true)
      //   .join(", ") || "default";
    // },
    ...mapState(["search"])
  },
  methods: {
    ...mapActions({
      removeFilter: "removeFilter"
    })
  }
};
</script>
