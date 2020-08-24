<template>
  <div >
    <q-list bordered>
      <q-expansion-item
        v-for="criterion in this.search.criteria"
        :key="criterion.sectionId"
        :label="criterion.sectionId"
        class="text-capitalize"
        dense
        dense-toggle
        expand-separator
      >
        <!-- <q-card> -->
          <!-- <q-card-section style="width: 300px" :class="{ 'truncate-chip-labels': true }"> -->
            <q-chip
              @click="toggle(chip)"
              v-for="chip in criterion.chips"
              :key="chip.id"
              dense
              outline
            >
              {{ chip.text }}
            </q-chip>
          <!-- </q-card-section> -->
        <!-- </q-card> -->
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("browser");

export default {
  name: "BrowserTabs",
  data() {
    return { tab: null };
  },
  computed: {
    ...mapState(["search"])
  },
  created() {
    // this.setCriteria();
  },
  methods: {
    toggle(chipData) {
      // console.log(chipData)
      this.toggleSearchCriteria(chipData);
      if (!this.isSearching) this.$root.$emit("toggleSearching");
    },
    ...mapActions(["toggleSearchCriteria", "setCriteria"])
  }
};
</script>
