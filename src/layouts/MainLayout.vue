<template>
  <q-layout
    view="hHh Lpr lff"
    container
    style="height: 100vh"
    class="shadow-2 rounded-borders"
  >
    <!-- <q-layout view="lHh Lpr lff"> -->
    <q-header elevated>
      <q-toolbar>
        <drawer-toggle
          v-if="loggedIn"
          @toggle-drawer="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-space />
        <q-toolbar-title class="text-h6 text-bold"
          ><span color="secondary">ProPlayer v8</span>
        </q-toolbar-title>

        <q-btn
          size="25px"
          color="secondary"
          to="/browser"
          icon="mdi-magnify"
          split
          flat
        />
        <auth-button  v-if="loggedIn" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="loggedIn"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="350"
      :breakpoint="500"
    >
      <dynamic-tab :tabList="tabs" />
    </q-drawer>

    <q-page-container>
      <transition mode="out-in">
        <router-view @toggle-drawer="leftDrawerOpen = !leftDrawerOpen" />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";
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
    ...mapState('auth', ["loggedIn"] ),
    ...mapState('default', {tabs: state => state.sidebarTabs}),
    tabs() {
      return this.sidebarTabs
    }
  },
  mounted() {
    this.resetSideBar();
  },
  methods: {
    ...mapActions('default', ["resetSideBar"])
  }
};
</script>

<style>
#mobileAuthNavBar {
  min-height: 125px;
  justify-content: space-between;
}
</style>
