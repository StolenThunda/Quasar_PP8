<template>
  <div>
    <q-toolbar>
      <slot name="toggleDrawer"></slot>
      <q-toolbar-title class="text-uppercase text-subvalue2 text-justify">
        Browser - {{ model }}
      </q-toolbar-title>
      <q-btn flat round dense icon="close" to="/" />
    </q-toolbar>

    <q-toolbar>
      <q-btn-toggle
        v-model="model"
        toggle-color="secondary"
        :options="tabs"
        @input="loadCategory"
      >
      </q-btn-toggle>

      <!-- @click="leftDrawer = !leftDrawer" -->
    </q-toolbar>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "BrowserToolBar",
  data: () => ({
    model: null,
    tabsAdded: false,
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
        value: "free lesson friday",
        label: "free lesson friday",
        icon: "mdi-sign-direction"
      },
      {
        value: "tone tuesday",
        label: "tone tuesday",
        icon: "mdi-bugle"
      },
      {
        value: "performances",
        label: "performances",
        icon: "mdi-music-clef-treble"
      },
      {
        value: "backing tracks",
        label: "backing tracks",
        icon: "mdi-volume-high"
      },
      {
        value: "imported",
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
      if (!this.tabsAdded) this.tabsAdded = this.addTabs();
    },
    addTabs() {
      this.addToDrawer([
        {
          name: "Browser",
          componentName: "Browser",
          icon: "magnify",
          cmp: () => import("components/browse/BrowserTabs")
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
