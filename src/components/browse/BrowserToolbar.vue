<template>
  <div>
    <q-toolbar>
      <slot name="toggleDrawer"></slot>
      <q-toolbar-title class="text-uppercase text-subvalue2 text-justify">
        Browser - {{ model }}
      </q-toolbar-title>
      <q-btn   label="Close" color="secondary" icon="close" to="/" />
    </q-toolbar>

    <q-toolbar>
        <!-- toggle-color="primary" -->
      <q-btn-toggle
        v-model="model"
        :options="tabs"
        @input="loadCategory"
        padding="2px 2px 5px 7px"
      >
      </q-btn-toggle>
    </q-toolbar>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "BrowserToolBar",
  data: () => ({
    model: null,
    filtersAdded: false,
    tabs: [
      {
        value: "courses",
        label: "courses",
        icon: "mdi-bookshelf",
        click: () => {
          console.log("HEY COURSES");
        }
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
  methods: {
    loadCategory(category) {
      console.log(`Cat: ${category}`);
      this.setCriteria(category);
      if (!this.filtersAdded) this.filtersAdded = this.addTabs(category);
    },
    addTabs(category) {
      this.addToDrawer([
        {
          name: "filters",
          componentName: "category_filters",
          icon: "mdi-filter-plus-outline",
          cmp: () => import("components/browse/BrowserFilters")
        }
      ]);
      return true;
    },
    ...mapActions("browser", ["addToDrawer", "setCriteria"])
  }
};
</script>

<style lang="stylus" scoped>
.btn-fixed-width
  width: 200px
</style>
