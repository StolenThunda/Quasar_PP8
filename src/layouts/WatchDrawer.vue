<template>
  <q-layout view="hhh lpR lFr"
    >
    
    <q-header reveal elevated>
      <watch-toolbar class="q-electron-drag">
        <template #toggle>
          <q-btn
            flat
            round
            dense
            :icon="drawerIcon"
            @click="leftDrawer = !leftDrawer"
          />
        </template>
        <template #auth>
          <auth-button />
        </template>
      </watch-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawer" side="left" show-if-above bordered overlay>
      <div
      class="row lt-md"
      >
        <q-btn
          class="offset-10 col"
          flat
          size="xl"
          icon="mdi-code-less-than"
          @click="leftDrawer = !leftDrawer"
        />
      </div>
      <dynamic-tab :tabList="tabs" />
    </q-drawer>

    <q-page-container>
      <router-view :key="$route.fullPath" />
    </q-page-container>
  </q-layout>
</template>

<script>
import DynamicTab from "components/base/DynamicTab";
import AuthButton from "components/base/AuthButton";
import WatchToolbar from "components/watch/toolbar/Toolbar";
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
    splitterModel: 55,
    thumbStyle: {
      right: "5px",
      borderRadius: "5px",
      backgroundColor: "#027be3",
      width: "10px",
      opacity: 0.35
    }
  }),
  computed: {
    drawerIcon(){ return this.leftDrawer ? 'mdi-backburger' : 'menu'},
    getTabs() {
      return this.tabs;
    },
    ...mapState("default", { tabs: "sidebarTabs" }),
    ...mapState("watch", {
      sections: "sections",
      currentCourse: "currentCourse"
    })
  },
  watch: {
    leftDrawer(val) {
      this.splitterModel = val ? 65 : 100;
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
        cmp: () => import("components/watch/sidebar/segmentTab/Segments"),
        menu: () => import("components/watch/settings/playerSettings")
      },
      {
        name: "Comments",
        componentName: "CommentsManager",
        icon: "mdi-comment-multiple-outline",
        iconOnly: true,
        cmp: () => import("components/watch/sidebar/commentTab/Comments")
      }
    ]);
  },
  methods: {
    
    showTab(tab) {
      this.currentTab = tab;
    },
    goBack() {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push("/").catch(err => {});
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
