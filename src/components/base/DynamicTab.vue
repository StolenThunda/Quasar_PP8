<template>
  <div>
    <q-tabs v-model="selectedTab">
      <q-tab
        v-for="tab in this.tabList"
        :key="tab.name"
        :name="tab.name"
        :icon="tab.icon"
        @click.prevent="selectedTab = tab.name"
      />
        <!-- :label="tab.name" -->
    </q-tabs>

    <q-tab-panels 
      animated
      transition-prev="scale"
      transition-next="scale"
      keep-alive 
      v-model="selectedTab">
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
    this.getFirst();
  },
  watch: {
    tabList: function() { this.getFirst(); }
  },
  methods: {
    getFirst() {
      const tl = this.$options.propsData.tabList
      if (!tl || tl.length === 0) return; 
      const list = JSON.parse(JSON.stringify(tl))
      const firstName = list[0]?.name || 0
      // console.log(`Loading Tab: ${firstName} of ${JSON.stringify(list)}`)
      this.selectedTab = typeof list[0]?.name === 'undefined' ? "" : firstName;
      console.log(`Selected Sidebar Tab: ${this.selectedTab}`)
    }
  }
}

</script>
