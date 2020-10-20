<template>
<q-layout view="hHh Lpr lff" container style="height: 100vh" class="shadow-2 rounded-borders">
  <!-- <q-layout view="lHh Lpr lff"> -->
    <q-header elevated>
      <q-toolbar>
        <drawer-toggle 
          v-if="$auth.isAuthenticated"
          @toggle-drawer="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title class="text-h6 text-bold"
          ><span color="secondary">ProPlayer v8</span>
        </q-toolbar-title>

        <q-btn
          v-if="$auth.isAuthenticated"
          size="25px"
          color="secondary"
          to="/browser"
          icon="mdi-magnify"
          split
          flat
        />
        <auth-button></auth-button>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="$auth.isAuthenticated"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="350"
      :breakpoint="500"
    >
      <dynamic-tab :tabList="sidebarTabs" />
    </q-drawer>

    <q-page-container>
      <transition mode="out-in">
      <router-view @toggle-drawer="leftDrawerOpen = !leftDrawerOpen" />
      </transition>
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
    AuthButton: () => import("components/base/AuthButton")
  },
  data: () => ({
      leftDrawerOpen: false
  }),
  computed: {
    ...mapState(["sidebarTabs"])
  },
  mounted() {
    this.resetSideBar();
  },
  methods: {
    ...mapActions(["resetSideBar"])
  }
};
</script>

<style>
#mobileAuthNavBar {
  min-height: 125px;
  justify-content: space-between;
}
</style>
