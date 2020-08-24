<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title >ProPlayer v8 </q-toolbar-title>
        <q-img
          to="/"
          class="logo"
          
          :src="logo"
          style="height: 60px; max-width: 100px"
          contain
        />

        
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen"  show-if-above bordered>
      <dyna-tab ref="dTab" :tabList="sidebarTabs" @add-tabs="addTabs" />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("default");
export default {
  name: "MainLayout",

  components: {
    DynaTab: () => import("components/DynaTab")
  },

  data() {
    return {
      logo: "https://cdn.texasbluesalley.com/styles/TXBALogo.svg",
      leftDrawerOpen: false,
    };
  },
  computed: {
    ...mapState(["sidebarTabs"])
  },
  mounted() {
    this.$refs.dTab.$on('add-tabs', this.addTabs)

  },
  methods: {
    addTabs(e) {
      // this.resetSideBar();
      console.log(`Adding from emit: ${e}`)
      this.addSidebarTabs(e);
    },
    ...mapActions(["resetSideBar","removeSidebarTab", "addSidebarTabs"])
  }
};
</script>

<style scoped>
.logo {
  /* border-radius: 50%; */
  -webkit-transition: -webkit-transform 0.8s ease-in-out;
  transition: transform 0.8s ease-in-out;
}
.logo:hover {
  -webkit-transform: rotate(360deg);
  transform: rotate(360deg);
}
</style>
