<template>
  <div>
    <q-toolbar>
      <slot name="toggle"></slot>
      <slot>
        <q-btn round flat to="/" icon="home" />
        <q-btn round flat @click="toggleInfo" icon="info" />
        <q-toolbar-title
          v-if="packageTitle"
        >
          <span
          class="absolute-center"
          v-html="packageTitle"
        ></span>
        </q-toolbar-title>
        <span class="absolute-center" v-else>No Course Data</span>
        <!-- <tool-list class="absolute-right" /> -->
      </slot>
      <slot name="auth"></slot>
    </q-toolbar>
    <course-info v-show="visible" @closeInfo="toggleInfo" />
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("watch");
export default {
  name: "WatchToolbar",
  components: {
    // ToolList: () => import("components/base/DefaultToolList"),
    CourseInfo: () => import("components/watch/CourseInfo")
  },
  data: () => ({
    visible: false
  }),
  computed: {
    ...mapState(["packageTitle"])
  },
  methods: {
    toggleInfo() { this.visible = !this.visible },
    gotoFavs() {
      this.$root.$emit("showTab", "favorites");
      this.$root.$emit("toggleSidebar");
    },
    goto: lnk => this.$route.push(lnk)
  }
};
</script>
