<template>
<div>Browser
  <!-- <BrowserTabs /> -->
  <div>
      <q-btn 
    color="primary"
    label="Test"
    type="button"
    @click="addTab"
  />
  </div>
      <q-btn 
    color="primary"
    label="Reset"
    type="button"
    @click="reset_sidebar"
  />
  <div>

  </div>
</div>
</template>
<script>
import { mapActions } from 'vuex';
// import { createNamespacedHelpers } from "vuex";
// const { mapState, mapActions } = createNamespacedHelpers("default");
export default {
  name: 'Browser',
  data: () => ({
    defaultTabs: [
      {
        name: "Browser",
        componentName: "BrowserTabs",
        icon: "magnify",
        cmp: () => import('components/BrowserTabs')
      }
    ]
  }),
  mounted() {
    this.addTab();
  },
  methods: {
    addTab() {
        const tabs = this.defaultTabs;
    console.log(`Create Tab: ${JSON.stringify(tabs)}`)
    // this.$store.dispatch("default/addSidebarTabs")
    this.add_tabs(tabs)
    },
    ...mapActions('default', { 
      add_tabs: 'addSidebarTabs',
      reset_sidebar: 'resetSideBar'
      })
  //       ...mapActions(["removeSidebarTab", "addSidebarTabs"])

  }
}
</script>
