<template>
  <q-expansion-item
    v-if="segments"
    class="q-ma-none q-pa-none"
    expand-separator
    :caption="title"
  >
    <q-list bordered dense>
      <q-item
        :id="'seg-' + seg.id"
        v-for="seg in segments"
        :key="seg.id"
        :set="(s = getSegInfo(seg))"
        :data-setup="JSON.stringify(seg)"
        :data-to="'/watch/' + packID + seg.to"
        ripple
        clickable
        @click="playSegment"
      >
        <q-item-section avatar>
          <q-icon :color="seg.color" :name="s.icon" size="lg"/>
        </q-item-section>

        <q-item-section>
          <q-item-label caption>{{ seg.title }}</q-item-label>
          <!-- <q-item-label
            ><sup>({{ seg.type }})</sup></q-item-label
          > -->
        </q-item-section>
        <!-- <q-separator /> -->
      </q-item>
    </q-list>
  </q-expansion-item>
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
    this.packageID = this.$route.params.packageID;
  },
  computed: {
    packID() { return  this.packageID }
  },
  methods: {
    ...mapActions(["setCurrentSegmentSetup"]),
    playSegment(e) {
      if (e.target.dataset) {
        const data = e.currentTarget.dataset;
        this.setCurrentSegmentSetup(data.setup);
        const path = `{name: 'player', params: { packageID: ${this.packageID}, segmentID: ${data.to}}`;
        console.log("Path", path);
        this.$router.push(path);
      }else{
        console.error(`${e.currentTarget} has no ID`)
      }

    },
    getSegInfo(seg) {
      var ico = {};
      // console.log("seginfo", seg);
      // const type = seg.sources ? seg.sources[0].type : "";
      switch (seg.type) {
        case "audio":
          ico = {
            icon: "fa fa-volume-up"
          };
          break;
        case "vimeo":
          ico = {
            icon: "fa fa-video"
          };
          break;
        case "youtube":
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
            icon: "mdi-guitar-pick"
          };
          break;
        case "gpx":
          ico = {
            icon: "mdi-guitar-pick"
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
    },
  }
}
</script>
