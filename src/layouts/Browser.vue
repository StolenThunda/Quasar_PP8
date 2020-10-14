<template>
    <!-- <q-layout view="lHh Lpr lff"> -->
    <q-layout view="hHh Lpr lff">
    <q-header elevated>
      <browser-toolbar @toggle-drawer="toggleDrawer">
        <template #toggleDrawer>
          <q-btn
            label="Add Filters"
            title="Add Filters"
            color="secondary"
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
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("browser");
export default {
  name: "BrowserLayout",
  components: {
    DynamicTab: () => import("components/base/DynamicTab"),
    BrowserToolbar: () => import("components/browse/BrowserToolbar")
  },
  data: () => ({
    leftDrawerOpen: false,
    category: null
  }),
  created() {
    this.$root.$on("toggle-drawer", this.toggleTruncate);
  },
  computed: {
    ...mapState(["drawer", "currentCategory"])
  },
  methods: {
    toggleDrawer(val) {
        this.leftDrawerOpen = (typeof val === 'boolean') ? val :  !this.leftDrawerOpen
    },
    catChange(cat) {
      this.category = cat;
    },
    removeDrawer(name) {
      this.removeDrawer(name);
    },
    ...mapActions(["removeDrawer"])
  }
};
</script>
