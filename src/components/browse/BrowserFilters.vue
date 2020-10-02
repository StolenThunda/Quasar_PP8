<template>
  <div class="q-pa-xs">
    <p>
      <q-input bottom-slots v-model="text" label="Keyword Search" counter dense>
        <template v-slot:prepend>
          <q-btn icon="search" color="primary" glossy dense />
        </template>
        <template v-slot:append>
          <q-icon name="close" @click="text = ''" class="cursor-pointer" />
        </template>
        <!-- <template v-slot:hint>
          Press [Enter] to search
        </template> -->
      </q-input>
    </p>

    <q-list bordered class="rounded-borders">
      <q-expansion-item
        v-for="criterion in this.search.criteria"
        :key="criterion.sectionId"
        :label="criterion.sectionId"
        :group="criterion.sectionId"
        :ref="criterion.sectionId"
        class="text-capitalize text-body2 section-header"
        header-style="background-color:#464646"
        expand-separator
      >
        <!-- default-opened -->
        <q-card>
          <q-card-section
            class="q-gutter-xs row"
            style="max-width: 300px"
            :class="{ 'truncate-chip-labels': truncate }"
          >
            <!-- @click="toggle()" -->
            <q-chip
              v-for="chip in criterion.chips"
              @click="toggle(chip)"
              :v-show="filterStatus[chip.sync]"
              :selected="filterStatus[chip.sync]"
              :id="chip.sync"
              :key="chip.sync + chip.name"
              :title="chip.text"
              :data-section-channel-id="criterion.sectionChannelId"
              :data-section-dependencies="criterion.sectionDependencies"
              :data-section-group-id="criterion.sectionGroupId"
              :data-section-id="criterion.sectionId"
              :data-section-stackable="criterion.sectionStackable"
              :data-section-type="criterion.sectionType"
              clickable
              color="primary"
              text-color="white"
              class="glossy ellipsis"
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
  data: () => ({
    truncate: false,
    text: ""
  }),
  created() {
    this.$root.$on("toggle-truncate", this.toggleTruncate);
  },
  computed: {
    ...mapState(['filterStatus', 'search'])
  },
  methods: {
    toggleTruncate() {
      this.truncate = !this.truncate;
    },
    toggle(chipData) {
      this.toggleSearchCriteria(chipData);
    },
    ...mapActions(["toggleSearchCriteria"])
  }
};
</script>

<style lang="sass" scoped>
.truncate-chip-labels > .q-chip
  max-width: 50px;
</style>
