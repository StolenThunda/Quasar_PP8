<template>
  <q-layout view="lHh LpR lFf">
    <q-header>
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
        <template #auth>
          <auth-button />
        </template>
      </watch-tool-bar>
    </q-header>

    <q-page-container>
      <q-splitter
        v-model="splitterModel"
        reverse
        :limits="[65, 100]"
        style="height: 92vh"
      >
        <template v-slot:before v-bind:tabs="tabs">
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
            @hover.native="doStuff"
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
import { mapState, mapActions } from "vuex";
export default {
  name: "WatchLayout",
  components: {
    DynamicTab: () => import("components/base/DynamicTab"),
    WatchToolBar: () => import("components/watch/WatchToolbar"),
    AuthButton: () => import("components/base/AuthButton")
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
        name: "Comments",
        componentName: "CommentsManager",
        icon: "mdi-comment-multiple-outline",
        iconOnly: true, 
        cmp: () => import("components/watch/sidebar/Comments")
        // menu: () => import("components/watch/sidebar/WatchSettings")
      },
      {
        name: "Segments",
        componentName: "SegmentsManager",
        icon: "mdi-segment",
        iconOnly: true,
        cmp: () => import("components/watch/sidebar/Segments"),
        menu: () => import("components/watch/settings/WatchSettings")
      },
      {
        name: "Loops",
        componentName: "InstantLoopsManager",
        icon: "mdi-sync",
        iconOnly: true,
        cmp: () => import("components/watch/sidebar/LoopTabs/InstantLoops")
        // menu: () => import("components/watch/settings/WatchSettings")
      },
      {
        name: "Chapters",
        componentName: "ChaptersManager",
        icon: "mdi-bookmark",
        iconOnly: true,
        cmp: () => import("components/watch/sidebar/Chapters")
        // menu: () => import("components/watch/settings/WatchSettings")
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
    doStuff(val) {
      console.log("val", val.type);
    },
    showTab(tab) {
      this.currentTab = tab;
    },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    async getPackageData() {
      return await this.fetchPackage(this.$route.params.packageID);
    },
    ...mapActions("default", ["addSidebarTabs"]),
    ...mapActions("watch", ["fetchPackage"])
  }
};
</script>
<style lang="sass" scoped>
.menu-list .q-item
  border-radius: 0 32px 32px 0
</style>
