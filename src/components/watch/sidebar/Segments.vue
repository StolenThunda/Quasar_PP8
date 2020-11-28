<template>
  <q-list>
    <template v-for="i in playSections">
      <q-expansion-item
        :key="i.sectionID"
        v-if="i.segments"
        group="somegroup"
        default-opened
        style="max-width: 350px"
        header-style="background-color:#464646; min-width: 250px;"
        expand-separator
        switch-toggle-side
      >
        <template #header>
          {{ i.sectionTitle }}
          <q-space />
        </template>
        <q-list class="q-py-sm rounded-borders" keep-alive bordered dense>
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
    </template>
  </q-list>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Segments",
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
