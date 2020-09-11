<template>
  <q-layout view="lHh Lpr lff">
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
      <!-- <q-scroll-area  style="height: 200px; max-width: 300px;"> -->
      <q-scroll-area
        class="fit q-pa-sm"
        :delay="1200"
        :thumb-style="thumbStyle"
        style="height: 90vh; max-width: 300px;"
      >
        <!-- :bar-style="barStyle" -->
        <!-- Content here -->
        <dynamic-tab :tabList="this.tabs" />
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view :key="$route.fullPath" />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "WatchLayout",
  components: {
    DynamicTab: () => import("components/base/DynamicTab"),
    WatchToolBar: () => import("components/watch/WatchToolbar")
  },
  data: () => ({
    leftDrawer: false,
    currentTab: null,
    favs: false,
    thumbStyle: {
      right: "5px",
      borderRadius: "5px",
      backgroundColor: "#027be3",
      width: "10px",
      opacity: 0.35
    }
  }),
  created() {
    this.getSegmentData();
    this.addSidebarTabs([
      {
        name: "Segments",
        componentName: "Segments",
        icon: "mdi-segment",
        cmp: () => import("components/watch/WatchSidebar")
      }
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
