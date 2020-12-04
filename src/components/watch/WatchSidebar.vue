<template>
  <q-list>
    <q-item v-for="i in playSections" :key="i.sectionID">
      <segments :segments="i.segments" :title="i.sectionTitle" />
    </q-item>
  </q-list>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapGetters } = createNamespacedHelpers("watch");
export default {
  name: "PlayerSideBarTabs",
  data: () => ({
    tab: true,
    sections: null
  }),
  mounted() {
    this.fetchSections();
  },
  computed: {
    ...mapState(["playSections"])
  },
  components: {
    segments: () => import("components/watch/Segments")
  },

  methods: {
    fetchSections() {
      this.sections = this.getPlaySections();
    },
    ...mapGetters(["getPlaySections"])
  }
};
</script>
