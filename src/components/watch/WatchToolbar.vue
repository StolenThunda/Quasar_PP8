<template>
  <div>
    <q-toolbar>
      <slot name="toggle"></slot>
      <slot>
        <q-btn round flat to="/" icon="home" />
        <q-btn round flat @click="toggleInfo" icon="info" />
        <q-toolbar-title >
          <span class="absolute-center text-capitalize" v-html="getTitle"></span>
        </q-toolbar-title>
        <q-fab
          v-if="getHistory.length"
          :label="'History: ' + getHistory.length"
          vertical-actions-align="right"
          color="secondary"
          icon="keyboard_arrow_down"
          direction="down"
        >
          <q-fab-action
            v-for="course in getHistory"
            :key="course.id"
            color="primary"
            :label="getTitle"
            :to="`/watch/${course.packageID}`"
          />
          <!-- color="primary" -->
        </q-fab>
        <q-btn size="25px" to="/browser" icon="mdi-magnify" flat />
      </slot>
      <slot name="auth"></slot>
    </q-toolbar>
    <course-info v-show="visible" @closeInfo="toggleInfo" />
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapGetters } = createNamespacedHelpers("watch");
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
    packageTitle() { return this.ProPlayer.thePackage.getTitle() },
    ...mapGetters(["getHistory"]),
    ...mapState([ "ProPlayer"])
  },
  methods: {
    showInfo(c) {
      console.log("course", c);
    },
    toggleInfo() {
      this.visible = !this.visible;
    },
    gotoFavs() {
      this.$root.$emit("showTab", "favorites");
      this.$root.$emit("toggleSidebar");
    },
    goto: lnk => this.$router.push(lnk)
  }
};
</script>
