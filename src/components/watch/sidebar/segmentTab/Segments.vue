<template>
  <q-list>
    <template v-for="section in ProPlayer.thePackage.getSections()">
      <q-expansion-item
        group="somegroup"
        :key="section.sectionID"
        v-if="section.segments"
        header-style="background-color:#464646; min-width: 250px;"
        expand-separator
        style="max-width: 350px"
        default-opened
        switch-toggle-side
      >
        <template #header>
          {{ section.sectionTitle }}
        </template>
        <!-- <pre>{{ activeSegment }}</pre> -->
        <q-list class="q-py-sm rounded-borders">
          <q-item
            v-for="segment in section.segments"
            :key="segment.segmentID"
            :set="(segmentIconInfo = getSegIco(segment))"
            :id="segment.segmentID"
            @click="loadSegment(segment)"
            :active="isActive(segment.segmentID)"
            active-class="bg-accent"
            clickable
            ripple
            dense
          >
            <q-item-section avatar>
              <q-icon
                :color="segmentIconInfo.color"
                :name="segmentIconInfo.icon"
                size="xs"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label caption lines="3">{{
                segment.segmentTitle
              }}</q-item-label>
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
import { mapState } from "vuex";
export default {
  name: "Segments",
  data: () => ({}),
  computed: {
    packID() {
      return this.$route.params.packageID;
    },
    ...mapState("watch", ["playSections", "ProPlayer", "activeSegment"])
  },
  methods: {
    isActive(id) {
      return this.activeSegment ? (this.activeSegment.segmentID === id) : false
    },
    loadSegment(seg) {
      const id = seg.segmentID;
      const route = `/watch/${this.packID}/${id}`;
      this.$store.commit("watch/SET_ACTIVE_SEGMENT", seg);
      this.$router.push({ path: `${route}` }).catch(err => {});
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
    }
  }
};
</script>
