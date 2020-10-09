<template>
  <div class="q-px-xs">
    <form id="filterForm">
      <p>
        <q-input
          bottom-slots
          v-model="searchText"
          label="Keyword Search"
          name="searchText"
          counter
          dense
        >
          <template v-slot:prepend>
            <q-btn icon="search" color="primary" glossy dense />
          </template>
          <template v-slot:append>
            <q-icon
              name="close"
              @click="searchText = ''"
              class="cursor-pointer"
            />
          </template>
          <!-- <template v-slot:hint>
          Press [Enter] to search
        </template> -->
        </q-input>
      </p>

      <q-list bordered class="rounded-borders">
        <!-- v-model="search.criteria" -->
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
                :key="chip.sync + chip.name"
                @click="toggle(chip)"
                :v-model="filterStatus[chip.sync]"
                :selected="filterStatus[chip.sync]"
                :id="chip.sync"
                :title="chip.text"
                :data-section-channel-id="criterion.sectionChannelId"
                :data-section-dependencies="criterion.sectionDependencies"
                :data-section-group-id="criterion.sectionGroupId"
                :data-section-id="criterion.sectionId"
                :data-section-stackable="criterion.sectionStackable"
                :data-section-type="criterion.sectionType"
                clickable
                :color="filterStatus[chip.sync] ? 'secondary' : 'primary'"
                text-color="white"
                :class="'glossy ellipsis' + { filtered: filtered }"
              >
                {{ chip.text }}
              </q-chip>
              <q-checkbox
                v-model="filterStatus[chip.sync]"
                v-for="chip in criterion.chips"
                :key="chip.name + Math.random()"
                :name="chip.name"
                :val="chip.value"
                dense
                class="filtered"
              />
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </form>
  </div>
</template>

<script>
import { serialize } from "../../plugins/vanillaJS_Utilities.js"
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("browser");

export default {
  name: "BrowserFilters",
  data: () => ({
    truncate: false,
    filtered: false,
    searchText: ""
  }),
  created() {
    this.$root.$on("toggle-truncate", this.toggleTruncate);
    this.$root.$on("toggle-filtered", this.toggleFiltered);
  },
  computed: {
    ...mapState(["filterStatus", "search"])
  },
  methods: {
    toggleTruncate() {
      this.truncate = !this.truncate;
    },
    toggleFiltered() {
      this.filtered = !this.filtered;
    },
    toggle(chipData) {
      chipData = Object.assign(chipData, { searchText: this.searchText });
      const form = document.querySelector("#filterForm");
      const formData = serialize(form)
      console.log('toggleForm', formData)
      this.toggleSearchCriteria(chipData, formData);
    },
    ...mapActions(["toggleSearchCriteria"])
  }
};
</script>

<style lang="sass" scoped>
.truncate-chip-labels > .q-chip
  max-width: 50px;

.filtered
  display: none
</style>
