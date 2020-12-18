<template>
  <q-list>
    <template v-for="section in sections">
      <q-expansion-item
        :key="section.sectionID"
        v-if="section.segments"
        group="somegroup"
        default-opened
        style="max-width: 350px"
        header-style="background-color:#464646; min-width: 250px;"
        expand-separator
        switch-toggle-side
      >
        <template #header>
          {{ section.sectionTitle }}
          <q-space />
        </template>
        <q-list class="q-py-sm rounded-borders" keep-alive bordered dense>
          <q-item
            v-for="segment in section.segments"
            :key="segment.segmentID"
            :set="(segmentIconInfo = getSegIco(segment))"
            :id="segment.segmentID"
            ripple
            clickable
            @click="openSegmentWithinCurrentPackage(segment.segmentID)"
            height="20px"
            active-class="secondary"
          >
            <q-item-section avatar>
              <q-icon
                :color="segmentIconInfo.color"
                :name="segmentIconInfo.icon"
                size="xs"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label caption>{{ segment.segmentTitle }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>
    </template>
    <q-inner-loading>
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
  </q-list>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Segments",
  computed: {
    sections() {
      return this.ProPlayer.thePackage.getSections();
    },
    packID() {
      return this.$route.params.packageID;
    },
    ...mapState("watch", ["playSections", "ProPlayer"])
  },
  methods: {
    openSegmentWithinCurrentPackage(id) {
      this.openSegment(id).then(id => {
        const route = `/watch/${this.packID}/${id}`;
        console.log("openSegmentWithinCurrentPackage_route", route);
        this.$router.push({ path: `${route}` });
      });
    },
    getSegIco(seg) {
      var ico = {};
      // switch (seg.sources[0].type) {
      switch (this.ProPlayer.getSegmentClass(seg)) {
        case "audio":
          ico = {
            icon: "mdi-volume-high",
            color: "accent"
          };
          break;
        case "video":
          ico = {
            icon: "mdi-video-vintage",
            color: "secondary"
          };
          break;
        case "url":
          ico = {
            icon: "mdi-youtube",
            color: "negative"
          };
          break;
        case "pdf":
          ico = {
            icon: "mdi-file-pdf",
            color: "white"
          };
          break;
        case "tablature":
          ico = {
            icon: "mdi-file-music",
            color: "green-5"
          };
          break;
        case "gpx":
          ico = {
            icon: "mdi-folder-music",
            color: "yellow-3"
          };
          break;
        default:
          ico = {
            icon: "mdi-information"
          };
          break;
      }
      // console.log("SEGINFO", seg, ico);
      return ico;
    },
    ...mapActions("watch", ["openSegment"])
  }
};
</script>
