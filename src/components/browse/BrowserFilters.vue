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
          <!-- style="max-width: 30vw" :class="{ 'truncate-chip-labels': true }" -->
          <q-card-section>
            <q-chip
              v-for="chip in criterion.chips"
              @click="toggle(criterion.sectionId, chip)"
              :selected="search.status[criterion.sectionId + '__' +chip.id]"
              :id="criterion.sectionId + '__' + chip.id"
              :key="criterion.sectionId + '__' + chip.id"
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
  computed: {
    ...mapState(["search"])
  },
  methods: {
    toggle(section, chipData) {
      // alert(JSON.stringify(chipData,2 ,null))
      const data = {section: section, chip: chipData}
      this.toggleSearchCriteria(data);
    },
    ...mapActions(["toggleSearchCriteria"])
  }
};
</script>
