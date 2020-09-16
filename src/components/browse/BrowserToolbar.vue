<template>
  <div>
    <q-toolbar>
      <slot name="toggleDrawer"></slot>
      <q-toolbar-title class="text-capitalize text-subvalue2 text-justify">
        Browser <span v-if="category"> - {{ category.replaceAll('_',' ') }} </span>
      </q-toolbar-title>
      <q-btn   label="Close" color="secondary" icon="close" to="/" />
    </q-toolbar>

    <q-toolbar inset>
      <!-- <q-scroll-area class="fit"> -->
      <q-btn-toggle
        v-model="category"
        :options="tabs"
        @input="loadCategory"
        toggle-color="secondary"
        push
        flat
        stretch
      >
      </q-btn-toggle>
      <!-- </q-scroll-area> -->
    </q-toolbar>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "BrowserToolBar",
  data: () => ({
    category: null,
    filtersAdded: false,
    tabs: [
      {
        value: "courses",
        label: "Courses",
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
  computed: {
    ...mapState(['currentCategory'])
  },
  methods: {
    loadCategory(category) {
      // console.log(`Cat: ${category}`);
      this.setCriteria(category);
      if (!this.filtersAdded) this.filtersAdded = this.addTabs(category);
      this.$emit('toggle-drawer', true)
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

<style lang="stylus" scoped>
.btn-fixed-width
  width: 200px
</style>
