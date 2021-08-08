<template>
  <!-- <q-layout view="lHh Lpr lff"> -->
  <q-layout view="hHh Lpr lff">
    <q-header elevated>
      <browser-toolbar @toggle-drawer="toggleDrawer" class="q-electron-drag">
        <template #toggleDrawer>
          <q-btn
            label="Toggle Filters"
            title="Toggle Filters"
            color="secondary"
            icon="menu"
            icon-right="mdi-filter-plus-outline"
            aria-label="Filters"
            @click="toggleDrawer"
          />
        </template>
      </browser-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" bordered>
      <dynamic-tab @changeCategory="catChange" :tabList="drawer" />
    </q-drawer>

    <q-page-container>
      <router-view :title="currentCategory" />
    </q-page-container>
  </q-layout>
</template>

<script>
import BrowserToolbar from "src/components/browse/Toolbar.vue";
import { mapState, mapActions } from "vuex";
export default {
  name: "BrowserLayout",
  components: {
    DynamicTab: () => import(/* webpackMode: "lazy", webpackPrefetch: true, webpackPreload: true */"components/base/DynamicTab.vue"),
    BrowserToolbar
  },
  data: () => ({
    leftDrawerOpen: false,
    category: null
  }),
  created() {
    this.$root.$on("toggle-drawer", this.toggleTruncate);
    this.$root.$on("toggle-favorite", this.toggleFavorite);
    this.$root.$on("remove-favorite", this.delFav);
    this.$root.$on("add-favorite", this.addFavorite);
  },
  computed: {
    ...mapState("browser", ["drawer", "currentCategory"])
  },
  methods: {
    toggleDrawer(val) {
      this.leftDrawerOpen =
        typeof val === "boolean" ? val : !this.leftDrawerOpen;
    },
    catChange(cat) {
      this.category = cat;
    },
    removeDrawer(name) {
      this.removeDrawer(name);
    },
    delFav(data) {
      console.log("favEmitted", data);
      this.removeFavorite(data);
    },
    ...mapActions("browser", ["removeDrawer"]),
    ...mapActions("default", [
      "addFavorite",
      "removeFavorite",
      "toggleFavorite"
    ])
  }
};
</script>
