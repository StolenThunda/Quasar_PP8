<template>
  <q-layout view="hHh lpR fFf">
    <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-header elevated>
      <current-search>
        <template #toggleDrawer>
          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="leftDrawerOpen = !leftDrawerOpen"
          />
          
        </template>
      </current-search>
    </q-header>

    <!-- (Optional) A Drawer; you can add one more with side="right" or change this one's side -->
    <q-drawer v-model="leftDrawerOpen" side="left" show-if-above bordered>
      <!-- QScrollArea is optional -->
      <q-scroll-area class="fit q-pa-sm">
        <dynamic-tab @changeCategory="catChange" :tabList="drawer" />
        <!-- v-if="drawer.length > 0"  -->
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view :title="currentCategory" />
    </q-page-container>
  </q-layout>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("browser");
export default {
  name: "BrowserLayout",
  components: {
    DynamicTab: () => import("components/base/DynamicTab"),
    CurrentSearch: () => import("components/browse/BrowserToolbar")
  },
  data: () => ({
    leftDrawerOpen: false,
    category: null
  }),
  computed: {
    ...mapState(["drawer", "currentCategory"])
  },
  methods: {
    catChange(cat) {
      this.category = cat;
    },
    removeDrawer(name) {
      this.removeDrawer(name);
    },
    ...mapActions(["removeDrawer"])
  }
};
</script>
