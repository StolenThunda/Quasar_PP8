<template>
  <q-layout
    view="lHh LpR lFf"
    container
    style="height: 100vh"
    class="shadow-2 rounded-borders"
  >
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
        <template #auth>
          <auth-button></auth-button>
        </template>
      </watch-tool-bar>
    </q-header>

    <q-drawer
      :width="300"
      :breakpoint="500"
      v-model="leftDrawer"
      show-if-above
      elevated
    >
      <q-scroll-area :delay="1200" :thumb-style="thumbStyle" class="fit">
        <!-- style="height: 90vh; max-width: 300px;" -->
        <dynamic-tab :tabList="this.tabs" class="q-item" />
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
    WatchToolBar: () => import("components/watch/WatchToolbar"),
    AuthButton: () => import("components/base/AuthButton")
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
    this.getPackageData();
    this.addSidebarTabs([
      {
        name: "Segments",
        componentName: "Segments",
        icon: "mdi-segment",
        cmp: () => import("components/watch/sidebar/Segments"),
        menu: () => import("components/watch/settings/WatchSettings")
      },
      {
        name: "Comments",
        componentName: "Comments",
        icon: "mdi-comment-multiple-outline",
        cmp: () => import("components/watch/sidebar/Comments"),
        // menu: () => import("components/watch/sidebar/WatchSettings")
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
