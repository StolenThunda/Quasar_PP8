<template>
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

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("browser");
export default {
  name: 'CurrentSearchBanner',
  computed: {
    selection() {
      return Object.keys(this.search.status)
        .filter(chip => this.search.status[chip] === true)
        .join(", ");
    },
    ...mapState(['search'])
  },
  methods: {
    ...mapActions({
      removeFilter: "removeFilter"
    })
  }
}
</script>
