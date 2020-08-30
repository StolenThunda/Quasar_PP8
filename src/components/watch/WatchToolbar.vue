<template>
  <div>
    <q-toolbar>
      <slot name="toggle"></slot>
      <slot>
        <q-btn round flat to="/" icon="home" />
        <q-btn round flat @click="visible = !visible" icon="info" />
        <q-toolbar-title>
          <span v-if="packageTitle" v-html="packageTitle"></span>
          <span v-else>No Course Data</span>
        </q-toolbar-title>
        <!-- <q-separator /> -->
        <tool-list />
      </slot>
    </q-toolbar>

    <q-slide-transition>
      <q-toolbar 
      id="courseInfo" 
      v-show="visible"      
      inset>
      <course-info />
    </q-toolbar>
    </q-slide-transition>
    
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("watch");
export default {
  name: 'WatchToolbar',
  components: {
    ToolList: () => import("components/base/DefaultToolList"),
    CourseInfo: () => import("components/watch/CourseInfo")
  },
  data: () => ({
    visible: false
  }),
  computed: {
    ...mapState(["packageTitle"])
  },
  methods: {
   
    gotoFavs() {
      this.$root.$emit("showTab", "favorites");
      this.$root.$emit("toggleSidebar");
    },
    goto: (lnk) => this.$route.push(lnk)
  }
};
</script>
