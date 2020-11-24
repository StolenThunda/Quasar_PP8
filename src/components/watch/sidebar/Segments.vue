<template>
  <q-list>
    <q-item v-for="i in playSections" :key="i.sectionID">
      <q-expansion-item
        v-if="i.segments"
        :caption="i.sectionTitle"
        group="somegroup"
        dense-toggle
        default-opened
        style="min-width: 225px;"
        class="text-capitalize text-body2 section-header"
        header-style="background-color:#464646"
      >
        <!-- expand-separator -->
        <q-list keep-alive bordered dense>
          <!-- :data-setup="JSON.stringify(seg)"
        :data-to="seg.to" -->
          <q-item
            v-for="seg in i.segments"
            :key="seg.id"
            :set="(s = getSegIco(seg))"
            :id="seg.id"
            ripple
            clickable
            @click="link(seg.id)"
            height="20px"
            active-class="secondary"
          >
            <!-- @click="$router.push({path:`/watch/${$route.params.packageID}/${playSegment(seg.id)}`})" -->
            <q-item-section avatar>
              <q-icon :color="seg.color" :name="s.icon" size="xs" />
            </q-item-section>

            <q-item-section>
              <q-item-label caption>{{ seg.title }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>
    </q-item>
  </q-list>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Segments",
  // props: {
  //   title: String,
  //   segments: Array
  // },
  computed: {
    ...mapState("watch", ["playSections"]),
    packID() {
      return this.$route.params.packageID;
    }
  },
  methods: {
    link(id) {
      this.playSegment(id).then(id => {
        const route = `/watch/${this.packID}/${id}`;
        console.log("link_route", route);
        this.$router.push({ path: `${route}` });
      });
    },
    getSegIco(seg) {
      var ico = {};
      // console.log("seginfo", seg);
      // const type = seg.sources ? seg.sources[0].type : "";
      switch (seg.sources[0].type) {
        case "audio":
          ico = {
            icon: "mdi-volume-high"
          };
          break;
        case "vimeo":
          ico = {
            icon: "mdi-video-vintage"
          };
          break;
        case "youtube":
          ico = {
            icon: "mdi-youtube"
          };
          break;
        case "pdf":
          ico = {
            icon: "mdi-file-pdf"
          };
          break;
        case "soundslice":
          ico = {
            icon: "mdi-file-music"
          };
          break;
        case "gpx":
          ico = {
            icon: "mdi-folder-music"
          };
          break;
        default:
          ico = {
            icon: "mdi-video"
          };
          break;
      }
      // console.log("SEGINFO", seg, ico);
      return ico;
    },
    ...mapActions("watch", ["playSegment"])
  }
};
</script>
