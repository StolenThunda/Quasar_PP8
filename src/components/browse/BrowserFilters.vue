<template>
  <div class="q-pa-xs">
    <p>
      <q-input bottom-slots v-model="text" label="Keyword Search" counter :dense="dense">
        <template v-slot:prepend>
          <q-icon name="place" />
        </template>
        <template v-slot:append>
          <q-icon name="close" @click="text = ''" class="cursor-pointer" />
        </template>

        <template v-slot:hint>
          Press [Enter] to search
        </template>
      </q-input>
    </p>
    <q-expansion-item
      label="Options"
      dense
      class="q-ma-xs"
      popup
    >
    <q-item>
      <q-toggle v-model="truncate" label="Truncate labels" />
    </q-item>
    </q-expansion-item>
    <q-list bordered class="rounded-borders">
      <q-expansion-item
        v-for="criterion in this.search.criteria"
        :key="criterion.sectionId"
        :label="criterion.sectionId"
        :group="criterion.sectionId"
        class="text-capitalize"
        expand-separator
        header-style="background-color:#464646"
        default-opened
      >
        <q-card>
          <q-card-section
            class="q-gutter-xs row" style="max-width: 300px" :class="{ 'truncate-chip-labels': truncate }">
            <q-chip
              v-for="chip in criterion.chips"
              @click="toggle(criterion.sectionId, chip)"
              :selected.sync="search.status[chip.sync]"
              :id="chip.sync"
              :key="chip.sync"
              clickable
              color="primary" text-color="white"
            >
              <div class="ellipsis">
              {{ chip.text }}
              </div>
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
  data: () => ({ 
    truncate: true,
    text: ""
  }),
  computed: {
    ...mapState(["search"])
  },
  methods: {
    toggle(section, chipData) {
      const data = {section: section, chip: chipData}
      this.toggleSearchCriteria(data);
    },
    ...mapActions(["toggleSearchCriteria"])
  }
};
</script>

<style lang="sass" scoped>
.truncate-chip-labels > .q-chip
  max-width: 140px
</style>