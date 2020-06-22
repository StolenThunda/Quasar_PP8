<template>
  <v-list dense>
    <v-list-group>
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title>{{ title }}</v-list-item-title>
        </v-list-item-content>
      </template>
      <v-list-item
        v-for="seg in segments"
        :key="seg.id"
        :set="(s = getSegInfo(seg))"
        link
        ripple
        @click="playsegment($event)"
      >
        <v-list-item-icon>
          <v-icon :color="seg.color">{{ s.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content
          :data-setup="JSON.stringify(seg)"
          :data-to="seg.to"
        >
          <v-list-item-subtitle>{{
            seg.type + " " + s.icon
          }}</v-list-item-subtitle>
          {{ seg.title }}
        </v-list-item-content>
      </v-list-item>
    </v-list-group>
  </v-list>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("watch");
export default {
  name: "SegmentTabContent",
  props: {
    title: String,
    segments: Array
  },
  mounted() {
    console.log("Seg Props", this.$props);
  },
  methods: {
    ...mapActions(["setCurrentSegmentSetup"]),
    playsegment(e) {
      console.log("data-setup", e.target.dataset);
      const data = e.target.dataset;
      this.setCurrentSegmentSetup(data.setup);
      console.log("seg.to", data.to);
      this.$router.push(data.to);
    },
    getSegInfo(seg) {
      var ico = {};
      // console.log("seginfo", seg);
      // const type = seg.sources ? seg.sources[0].type : "";
      switch (seg.type) {
        case "audio/mp3":
          ico = {
            icon: "fa fa-volume-up"
          };
          break;
        case "video/vimeo":
          ico = {
            icon: "fa fa-video"
          };
          break;
        case "video/youtube":
          ico = {
            icon: "fa fa-youtube"
          };
          break;
        case "pdf":
          ico = {
            icon: "far fa-file-pdf"
          };
          break;
        case "soundslice":
          ico = {
            icon: " guitar-pick"
          };
          break;
        case "application/gpx+xml":
          ico = {
            icon: " guitar-pick"
          };
          break;
        default:
          ico = {
            icon: "fa fa-video"
          };
          break;
      }
      // console.log("SEGINFO", seg, ico);
      return ico;
    }
  }
};
</script>

<style lang="scss" scoped></style>
