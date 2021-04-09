<template>
  <div>
    <q-toolbar>
      <slot name="toggle"></slot>
      <slot>
        <q-btn round flat to="/" icon="home" />
        <q-btn round flat @click="toggleInfo" icon="info" />
        <q-toolbar-title
        
          class="text-h5 text-bold absolute-center"
        >
        <div
          v-html="packageTitle"
        />
      </q-toolbar-title>
        <q-space />
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
            :label="packageTitle"
            :to="`/watch/${course.packageID}`"
          />
        </q-fab>
        <q-fab
          v-if="hasDownloads"
          direction="down"
          label="Download MP3"
          icon="mdi-cloud-download"
        >
          <q-fab-action
            type="a"
            round
            flat
            label="Download MP3"
            icon="mdi-cloud-download"
            :href="downloadLink"
          />
        </q-fab>
        <q-btn size="25px" to="/browser" icon="mdi-magnify" flat />
      </slot>
      <q-btn
        class="q-pa-xs"
        round
        flat
        icon="mdi-arrow-expand-all"
        v-if="fullScreenEnabled"
        @click="toggleFullScreen"
      />
      <slot name="auth"></slot>
    </q-toolbar>
    <q-toolbar v-if="activeSegment"  inset>
      <q-toolbar-title class="text-caption text-center" >
        {{ activeSegment.segmentFullTitle }}
      </q-toolbar-title>
    </q-toolbar>
    <course-info v-show="visible" @closeInfo="toggleInfo" />
  </div>
</template>

<script>
import CourseInfo from "src/components/watch/toolbar/CourseInfo.vue";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapGetters } = createNamespacedHelpers("watch");
export default {
  name: "WatchToolbar",
  components: {
    CourseInfo
  },
  data: () => ({
    title: "",
    visible: false
  }),
  mounted() {
    this.title = this.packageTitle;
  },
  watch: {
    packageTitle(val) {
      this.title = this.packageTitle;
    }
  },
  computed: {
    fullScreenEnabled() {
      let loaded =
        this.ProPlayer.theSegment.isLoaded() &&
        (this.ProPlayer.theSegment.getVimeoCode() !== "" ||
          this.ProPlayer.theSegment.getYouTubeCode() !== "" ||
          this.ProPlayer.theSegment.getMP3Filename() !== "" ||
          this.ProPlayer.theSegment.getSoundSliceCode() !== "");
      return loaded;
    },
    downloadLink() {
      let file = this.ProPlayer.theSegment.getMP3Filename();
      console.log("mp3", file);
      return `https://cdn.texasbluesalley.com/audio/${file}  download='${file}'`;
    },
    hasDownloads() {
      return (
        this.ProPlayer.theSegment.isLoaded() &&
        this.ProPlayer.theSegment.getMP3Filename() !== ""
      );
    },
    packageTitle() {
      var title = this.ProPlayer.thePackage.getTitle();
      return title === "Imported Video"
        ? this.ProPlayer.theSegment.getFullDisplayName()
        : title;
    },
    ...mapGetters(["getHistory"]),
    ...mapState(["ProPlayer", "activeSegment"])
  },
  methods: {
    toggleFullScreen() {
      this.ProPlayer.fullscreeenToggle();
    },
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
    goto: lnk => this.$router.push(lnk).catch(err => {})
  }
};
</script>
