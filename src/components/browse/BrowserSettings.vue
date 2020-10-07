<template>
  <div class="row no-wrap q-pa-md" v-on="$listeners">
    <div class="column">
      <div class="text-overline q-mb-md">Settings</div>
      <q-toggle
        v-model="truncate"
        label="Truncate Labels"
        checked-icon="check"
        color="secondary"
        unchecked-icon="clear"
      />
      <q-toggle
        v-model="filtered"
        label="Filter Labels"
        checked-icon="check"
        color="secondary"
        unchecked-icon="clear"
      />
    <q-btn
    label="Get Filter List"
    color="secondary"
    @click="showCurrentFilters"
    outline
    />
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const {  mapGetters, mapState } = createNamespacedHelpers("browser");
export default {
  data () {
    return {truncate: false, filtered: false, fList: null}
  },
  watch: {
    truncate: function () {
      this.$root.$emit('toggle-truncate')
    },
    filtered: function () {
      this.$root.$emit('toggle-filtered')
    }, 
    filterList: function() {
      this.fList = this.filterList
      console.log("watch", this.search.current)
    }
  },
  computed: {
    ...mapState(['filterSectionList']),
    // ...mapGetters({filterList: 'getFilterList'})
  },
  methods: {
    showCurrentFilters() {
      const list = this.filterSectionList;
      console.log('current filters', list.a_Sections)
      // alert(JSON.stringify(list,null,2))
    }
  }
}
</script>
