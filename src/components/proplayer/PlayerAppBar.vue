<template>
  <!-- src="https://i.picsum.photos/id/307/1920/1080.jpg" -->
  <v-toolbar flat>
    <slot name="toggle" />
    <v-btn icon :to="{ name: 'index' }">
      <q-icon name="home</v-icon>
    </v-btn>

    <v-spacer></v-spacer>

    <v-toolbar-title>
      <span v-if="packageTitle" v-html="packageTitle"></span>
      <span v-else>No Course Data</span>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon :to="{ name: 'browser' }">
      <q-icon name="magnify</v-icon>
    </v-btn>

    <v-btn icon @click="gotoFavs">
      <q-icon name="heart</v-icon>
    </v-btn>

    <v-btn icon>
      <i class="fa fa-arrows-alt"></i>
    </v-btn>
    <ToolList />
  </v-toolbar>
</template>

<script>
import ToolList from "../components/base/ToolList";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("watch");
export default {
  components: {
    ToolList
  },
  computed: {
    ...mapState(["packageTitle"])
  },
  methods: {
    toggleInfo: () => {
      this.$root.$emit("toggleCourseInfo");
    },
    gotoFavs() {
      this.$root.$emit("showTab", "favorites");
      this.$root.$emit("toggleSidebar");
    },
    goto: lnk => this.$route.push(lnk)
  }
};
</script>
