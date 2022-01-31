<template>
  <div class="q-px-xs">
    <form id="filterForm">
      <p>
        <!-- bottom-slots -->
        <q-input
          v-model="formKeywords"
          label="Keyword Search"
          name="keywords"
          dense
        >
          <template v-slot:prepend>
            <q-btn icon="search" color="primary" glossy dense />
          </template>
          <template v-slot:append>
            <q-icon
              name="close"
              @click="formKeywords = null"
              class="cursor-pointer"
            />
          </template>
          <template v-slot:hint>
            Press [Enter] to search
          </template>
        </q-input>
      </p>
      <q-list bordered class="rounded-borders">
        <!-- :set="(id = criterion.sectionId)" -->
        <q-expansion-item
          v-for="criterion in this.search.criteria"
          :set="(name = criterion.sectionId)"
          :key="criterion.sectionId"
          :label="criterion.sectionId"
          :group="criterion.sectionId"
          :ref="criterion.sectionId"
          class="text-capitalize text-body2 section-header"
          header-style="background-color:#464646"
          expand-icon-toggle
          expand-separator
          @show="filterCategory = criterion.sectionId"
          dense
          @hide="filterCategory = ''"
        >
          <template #header>
            <q-item-section>
              {{ criterion.sectionId }}
            </q-item-section>
          </template>
          <div>
            <!-- <q-select
              outlined
              standout
              hide-dropdown-icon
              :key="criterion.sectionId + '__select'"
              :value="model"
              use-input
              use-chips
              multiple
              input-debounce="0"
              :options="getOptions(criterion.sectionId)"
              @filter="filterFn"
              @input-value="setModel"
            >
              <template #prepend>
              <q-icon name="mdi-filter" />
            </template>
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select> -->
          </div>

          <q-card>
            <q-card-section
              class="q-gutter-xs row"
              style="max-width: 300px"
              :class="{ 'truncate-chip-labels': truncate }"
            >
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
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </form>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("browser");

export default {
  name: "BrowserFilters",
  data: () => ({
    model: null,
    showSearch: {},
    filterCategory: null,
    truncate: false,
    filtered: false,
    selectedChips: [],
    formKeywords: ""
  }),
  mounted() {
    // loop search for section titles to build boolean matrix
    Object.keys(this.search.criteria).forEach(k => {
      console.log("key", k);
      const options = this.search.criteria[k].chips.map(a => a.text);
      this.showSearch[k] = { show: true, filterText: "", options: options };
    });
  },
  computed: {
    ...mapState(["filterStatus", "search", "keywords"]),
    show(name) {
      // console.log(name);
      return this.showSearch[name].show || false;
    }
  },
  methods: {
    getOptions(name) {
      return this.showSearch[name].options;
    },
    toggleCategoryFilter(key) {
      console.log("toggle filter");
      this.showSearch[key].show = !this.showSearch[key].show;
    },
    filterFn(val, update, abort) {
      update(() => {
        const needle = val.toLocaleLowerCase();
        const list = this.getOptions(this.filterCategory)
        this.showSearch[this.filterCategory].options = list.filter(
          v => v.toLocaleLowerCase().indexOf(needle) > -1
        );
      });
    },

    setModel(val) {
      this.model = val;
    },
    changeStatus(id) {
      console.log("change status", id);
      this.showSearch[id].show = !this.showSearch[id].show;
    },
    toggleTruncate() {
      this.truncate = !this.truncate;
    },
    toggleFiltered() {
      this.filtered = !this.filtered;
    },
    toggle(chipData) {
      this.toggleSearchCriteria(chipData);
    },
    ...mapActions(["toggleSearchCriteria"])
  }
};
</script>
<!-- 
<style lang="scss" scoped>
.truncate-chip-labels > .q-chip {
  max-width: 50px;
}
.filtered {
  display: none;
}
</style> -->
