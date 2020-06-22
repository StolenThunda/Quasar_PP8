<template>
  <v-toolbar flat>
    <slot name="drawerToggle"></slot>

    <v-btn :to="{ name: 'index' }" icon>
      <q-icon name="home</v-icon>
    </v-btn>

    <v-spacer></v-spacer>
    <v-toolbar-title>Browse...</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-chip-group active-class="primary--text">
      <v-chip class="ma-2" @click="load('pro_player_packages')">Courses</v-chip>
      <v-chip class="ma-2" @click="load('free_lesson_friday')"
        >Free Lesson Friday</v-chip
      >
      <v-chip class="ma-2" @click="load('tone_tuesday')">Tone Tuesday</v-chip>
      <v-chip class="ma-2" @click="load('performances')">Performances</v-chip>
      <v-chip class="ma-2" @click="load('backing_tracks')"
        >Backing Tracks</v-chip
      >
      <v-chip class="ma-2" @click="load('youtube_videos')">Imported</v-chip>
      <v-chip class="ma-2" @click="load('youtube')">
        <v-icon class="pr-2"> youtube</v-icon>Youtube
      </v-chip>
    </v-chip-group>
    <v-spacer></v-spacer>
    <ToolList />
  </v-toolbar>
</template>

<script>
import ToolList from "../components/base/ToolList";
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("browser");

export default {
  name: "BrowserToolbar",
  components: {
    ToolList
  },
  methods: {
    load(category) {
      this.setCriteria(category);
      this.$root.$emit("toggleSidebar");
    },
    ...mapActions(["setCriteria"])
  }
};
</script>

<style lang="scss" scoped></style>
