<template>
  <q-layout view="lHh Lpr lff">
    <q-header elevated>
      <q-toolbar>
        <drawer-toggle @toggle-drawer="leftDrawerOpen = !leftDrawerOpen" />
        <q-toolbar-title>ProPlayer v8 </q-toolbar-title>

        <q-btn to="/browser" icon="mdi-magnify" flat />
        <tool-list />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <dynamic-tab ref="dTab" :tabList="sidebarTabs" @add-tabs="addTabs" />
    </q-drawer>

    <q-page-container>
      <router-view @toggle-drawer="leftDrawerOpen = !leftDrawerOpen" />
    </q-page-container>
  </q-layout>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("default");
export default {
  name: "MainLayout",

  components: {
    DynamicTab: () => import("components/base/DynamicTab"),
    DrawerToggle: () => import("components/base/DrawerToggle"),
    ToolList: () => import("components/base/DefaultToolList")
  },
  data() {
    return {
      logo: "https://cdn.texasbluesalley.com/styles/TXBALogo.svg",
      leftDrawerOpen: false
    };
  },
  computed: {
    ...mapState(["sidebarTabs"])
  },
  mounted() {
    this.resetSideBar();
  },
  methods: {
    addTabs(e) {
      // this.resetSideBar();
      console.log(`Adding from emit: ${e}`);
      this.addSidebarTabs(e);
    },
    ...mapActions(["resetSideBar", "removeSidebarTab", "addSidebarTabs"])
  }
};
</script>
