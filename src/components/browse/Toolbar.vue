<template>
  <div>
    <q-toolbar>
      <slot name="toggleDrawer" v-if="activeCategory"></slot>
      <q-toolbar-title class="text-capitalize text-center text-subtitle2">
        Browser
        
        <q-breadcrumbs-el v-model="activeCategory"> {{ entitleCategory() }}</q-breadcrumbs-el>
      </q-toolbar-title>
      <q-btn label="Close" color="secondary" icon="close" to="/" />
    </q-toolbar>
      <center>
      
        <div id="browser-wrapper">
      <q-scroll-area
        horizontal
        style="height: 50px; width: 95vw;"
        class="bg-grey-14 rounded-borders"
      >
          <div class="browser-filter-row row no-wrap q-pa-sm" id="top-level-filters">
            <ul
              class="browser-top-filter-list"
              id="filter-level-1"
              v-for="tab in tabs"
              :key="tab.name"
            >
              <li class="q-mx-xs">
                <q-btn
                  push
                  rounded
                  fab-mini
                  no-wrap
                  :color="activeCategory === tab.value ? 'secondary' : 'black'"
                  :label="tab.label"
                  size="md"
                  @click="loadCategory(tab.value)"
                  :icon="tab.icon"
                />
              </li>
            </ul>
          </div>
      </q-scroll-area>
        </div>          
      </center>
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
    entitleCategory() { 
      return (this.activeCategory) ? " - " + format.capitalize(
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
          cmp: () => import(  /* webpackChunkName: "browser" */"components/browse/Filters"),
          // menu: () => import("components/browse/Settings")
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
