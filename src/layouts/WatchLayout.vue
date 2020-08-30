<template>
  <q-layout view="hHh LpR lFf">
    <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-header reveal elevated>
      <watch-tool-bar>
        <template #toggle>
          <q-btn
            flat
            round
            dense
            icon="menu"
            @click="leftDrawer = !leftDrawer"
          />
        </template>
      </watch-tool-bar>
    </q-header>

    <q-drawer v-model="leftDrawer" side="left" bordered show-if-above>
      <!-- QScrollArea is optional -->
      <q-scroll-area class="fit q-pa-sm">
        <!-- Content here -->
        <dynamic-tab :tabList="this.tabs" />
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: "WatchLayout",
  components: {
    DynamicTab: () => import("components/base/DynamicTab"),
    WatchToolBar: () => import("components/watch/WatchToolbar")
  },
  data: () => ({
    leftDrawer: false,
    currentTab: null,
    favs: false
  }),
  created() {
    this.getSegmentData();
    this.addSidebarTabs([
      {
        name: "Segments",
        componentName: "Segments",
        icon: "menu",
        cmp: () => import("components/watch/WatchSidebar")
      }
    ]);
    
  },
  computed: {
    ...mapState("default",{ tabs: "sidebarTabs"}),
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
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    async getSegmentData() {
      return await this.fetchPackage(this.$route.params.packageID);
    },
    ...mapActions("default", ["addSidebarTabs"]),
    ...mapActions("watch", ["fetchPackage"])
  }
};
</script>
