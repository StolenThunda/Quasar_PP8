<template>
  <div>
    <q-toolbar>
      <slot name="toggleDrawer" v-if="activeCategory"></slot>
      <q-toolbar-title class="text-capitalize text-center text-subvalue2">
        Browser
        
        <q-breadcrumbs-el v-model="activeCategory"> {{ entitleCategory(activeCategory) }}</q-breadcrumbs-el>
      </q-toolbar-title>
      <q-btn label="Close" color="secondary" icon="close" to="/" />
    </q-toolbar>

    <q-toolbar inset>
      <div id="browser-wrapper">
        <div class="browser-filter-row" id="top-level-filters">
          <ul
            class="browser-top-filter-list"
            id="filter-level-1"
            v-for="tab in tabs"
            :key="tab.name"
          >
            <li class="q-px-xs">
              <q-btn
                push
                rounded
                :color="activeCategory === tab.value ? 'secondary' : 'black'"
                :label="tab.label"
                @click="loadCategory(tab.value)"
                :icon="tab.icon"
              />
            </li>
          </ul>
        </div>
      </div>
    </q-toolbar>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { morph, format } from "quasar";

// Morph one DOM element to another:
const searchMorph = morph({
  from: ".browser-top-filter-list",
  to: ".q-tab--active"
});
export default {
  name: "BrowserToolBar",
  data: () => ({
    category: null,
    filtersAdded: false,
    tabs: [
      {
        value: "courses",
        label: "Courses",
        icon: "mdi-bookshelf"
      },
      {
        value: "free_lesson_friday",
        label: "free lesson friday",
        icon: "mdi-sign-direction"
      },
      {
        value: "tone_tuesday",
        label: "tone tuesday",
        icon: "mdi-bugle"
      },
      {
        value: "performances",
        label: "performances",
        icon: "mdi-music-clef-treble"
      },
      {
        value: "backing_tracks",
        label: "backing tracks",
        icon: "mdi-volume-high"
      },
      {
        value: "youtube_videos",
        label: "imported",
        icon: "mdi-import"
      },
      {
        value: "youtube",
        label: "youtube",
        icon: "mdi-youtube"
      }
    ]
  }),
  computed: {
    ...mapState('browser',["activeCategory"])
  },
  methods: {
    entitleCategory() { return (this.activeCategory) ? " - " + format.capitalize(
        this.activeCategory.replaceAll("_", " ")
      ) : ""
    },
    loadCategory(category) {
      // console.log(`Cat: ${category}`);
      searchMorph();
      this.setCriteria(category);
      if (!this.filtersAdded) this.filtersAdded = this.addTabs(category);
      this.$emit("toggle-drawer", true);
    },
    addTabs(category) {
      this.addToDrawer([
        {
          name: "filters",
          componentName: "category_filters",
          icon: "mdi-filter-plus-outline",
          cmp: () => import("components/browse/BrowserFilters"),
          menu: () => import("components/browse/BrowserSettings")
        }
      ]);
      return true;
    },
    ...mapActions("browser", ["addToDrawer", "setCriteria"])
  }
};
</script>

<style scoped>
.q-toolbar--inset {
  background-color: rgba(192, 192, 192, 0.39);
  /* background-color: white !important ; */
  transition: opacity 0.1s;
  /* z-index: 1000; */
}
ul.browser-top-filter-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: inline-flex;
}
</style>
