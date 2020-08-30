<template>
  <div>
    <q-tabs v-model="selectedTab">
      <q-tab
        v-for="tab in this.tabList"
        :key="tab.name"
        :name="tab.name"
        :icon="tab.icon"
        @click="selectedTab = tab.name"
      />
        <!-- :label="tab.name" -->
    </q-tabs>

    <q-tab-panels keep-alive v-model="selectedTab">
      <q-tab-panel 
        v-for="tab in this.tabList" 
        :key="tab.name" 
        :name="tab.name"
        >
        <component :is="tab.cmp"></component>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
export default {
  name: "DynamicTabs",
  data: () => ({
    selectedTab: null
  }),
  props: {
    tabList: Array,
    default: () => new Array()
  },
  mounted() {
    const list = JSON.parse(JSON.stringify(this.$options.propsData.tabList))
    this.selectedTab = list[0].name;
  }

};
</script>
