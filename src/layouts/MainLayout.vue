<template>
  <q-layout view="lHh Lpr lff">
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
        <!-- <q-btn-dropdown
          id="qsLoginBtn"
          class=""
          :icon="toggleIcon"
          :label="toggleLoginBtn"
          @click.prevent="login"
          split
          rounded
          outline
        >
          <div class="row no-wrap q-pa-md" v-if="$auth.isAuthenticated">
            <div class="column">
              <div class="text-h6 q-mb-md">Settings</div>
              <q-btn
                icon-right="fa fa-user"
                label="User Profile"
                to="/profile"
              />
              <q-btn
                icon-right="fa fa-power-off"
                label="Logout"
                @click.prevent="logout"
              />
            </div>

            <q-separator vertical inset class="q-mx-lg" />

            <div class="column items-center">
              <q-avatar size="72px">
                <img :src="this.$auth.user.picture" />
              </q-avatar>

              <div class="text-subtitle1 q-mt-md q-mb-xs">
                {{ this.$auth.user.name }}
              </div>

              <q-btn
                color="primary"
                label="Logout"
                push
                size="sm"
                v-close-popup
              />
            </div>
            
          </div>
          <div class="row no-wrap q-pa-md" v-else>
              <div class="column">Log in for Settings</div>
            </div>
        </q-btn-dropdown> -->
        <!-- <tool-list v-if="$auth.isAuthenticated" /> -->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="$auth.isAuthenticated"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <dynamic-tab :tabList="sidebarTabs" />
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
