<template>
  <div class="q-pa-xs">
    <q-list bordered class="rounded-borders">
      <q-expansion-item
        v-for="criterion in this.search.criteria"
        :key="criterion.sectionId"
        :label="criterion.sectionId"
        class="text-capitalize"
        dense
        dense-toggle
        expand-separator
        keep-alive
      >
        <q-card>
          <q-card-section style="max-width: 30vw" :class="{ 'truncate-chip-labels': true }">
              <!-- :selected.sync="this.selected(chip)" -->
            <q-chip
              v-for="chip in criterion.chips"
              @click="toggle(chip)"
              :key="chip.id"
              outline
              clickable
            >
              {{ chip.text }}
            </q-chip>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("browser");

export default {
  name: "BrowserFilters",
  data() {
    return { tab: null };
  },
  computed: {
    // selected(chip) { return this.isChipSelected(chip)},
    // ...mapGetters(['isChipSelected']),
    ...mapState(["search"])
  },
  methods: {
    toggle(chipData) {
      alert(JSON.stringify(chipData,2 ,null))
      // this.toggleSearchCriteria(chipData);
      // if (!this.isSearching) this.$emit("toggleSearching");
    },
    ...mapActions(["toggleSearchCriteria"])
  }
};
</script>
