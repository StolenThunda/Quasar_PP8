<template>
  <div>
    <q-tabs v-model="selectedTab">
      <q-tab
        v-for="tab in this.tabList"
        :key="tab.name"
        :label="tab.name"
        :name="tab.name"
        :icon="tab.icon"
        @click="selectedTab = tab"
      />
    </q-tabs>

    <q-tab-panels keep-alive v-model="selectedTab">
      <q-tab-panel 
         v-for="tab in this.tabList"
        :key="tab.name"
        :name="tab.name"
        >
        <component :is="tab.cmp" ></component>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
export default {
  name: "DynaTab",
  data: () => ({
    selectedTab: "Favorites"
  }),
  props: {
    tabList: Array,
    default: []
  }
};
</script>
