<template>
  <q-layout view="lHh LpR lFf">
    <q-header>
      <watch-toolbar>
        <template #toggle>
          <q-btn
            flat
            round
            dense
            icon="menu"
            @click="leftDrawer = !leftDrawer"
          />
        </template>
        <template #auth>
          <auth-button />
        </template>
      </watch-toolbar>
    </q-header>

    <q-page-container>
      <q-splitter
        v-model="splitterModel"
        reverse
        :limits="[65, 100]"
        style="height: 92vh"
      >
        <template v-slot:before v:tabs="tabs">
          <q-scroll-area :thumb-style="thumbStyle" class="fit">
            <dynamic-tab :tabList="tabs" class="q-item" />
          </q-scroll-area>
        </template>

        <template v-slot:separator>
          <!-- size="140px" -->
          <q-avatar
            color="secondary"
            text-color="white"
            icon="drag_indicator"
            @dblclick="leftDrawer = !leftDrawer"
          />
        </template>
        <template v-slot:after>
          <router-view :key="$route.fullPath" />
        </template>
      </q-splitter>
    </q-page-container>
  </q-layout>
</template>

<script>

import DynamicTab from "components/base/DynamicTab"
import DrawerToggle from "components/base/DrawerToggle"
import AuthButton from "components/base/AuthButton"
import WatchToolbar from "components/watch/WatchToolbar"
import { mapState, mapActions } from "vuex";
export default {
  name: "WatchLayout",
  components: {
    DynamicTab,
    WatchToolbar,
    AuthButton
  },
  data: () => ({
    leftDrawer: true,
    currentTab: null,
    favs: false,
    splitterModel: 80,
    thumbStyle: {
      right: "5px",
      borderRadius: "5px",
      backgroundColor: "#027be3",
      width: "10px",
      opacity: 0.35
    }
  }),
  computed: {
    getTabs() {
      return this.tabs;
    }
  },
  watch: {
    leftDrawer(val) {
      this.splitterModel = val ? 80 : 100;
    }
  },
  created() {
    this.getPackageData();
    this.addSidebarTabs([
      {
        name: "Segments",
        componentName: "SegmentsManager",
        icon: "mdi-segment",
        iconOnly: true,
        cmp: () => import("components/watch/sidebar/Segments"),
        menu: () => import("components/watch/settings/WatchSettings")
      },
      {
        name: "Comments",
        componentName: "CommentsManager",
        icon: "mdi-comment-multiple-outline",
        iconOnly: true, 
        cmp: () => import("components/watch/sidebar/Comments")
      }, 
    ]);
  },
  computed: {
    ...mapState("default", { tabs: "sidebarTabs" }),
    ...mapState("watch", {
      sections: "sections",
      currentCourse: "currentCourse"
    })
  },
  methods: {
    showTab(tab) {
      this.currentTab = tab;
    },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/").catch(err => {});
    },
    async getPackageData() {
      return await this.fetchPackage(this.$route.params.packageID);
    },
    ...mapActions(["addSidebarTabs"]),
    ...mapActions("watch", ["fetchPackage"])
  }
};
</script>
<style lang="sass" scoped>
.menu-list .q-item
  border-radius: 0 32px 32px 0
</style>
