<template>
  <q-list>
    <q-item v-for="i in playSections" :key="i.sectionID">
      <segments :segments="i.segments" :title="i.sectionTitle" />
    </q-item>
  </q-list>
</template>

<script> 
import Segments from "components/watch/Segments.vue"
import { createNamespacedHelpers } from "vuex";
const { mapState, mapGetters } = createNamespacedHelpers("watch");
export default {
  name: "PlayerSideBarTabs",
  computed: {
    ...mapState(["playSections"])
  },
  components: {
    Segments
  },
};
</script>
