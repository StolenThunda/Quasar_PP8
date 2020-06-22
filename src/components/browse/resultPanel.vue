<template>
  <v-container>
    <v-row dense align-content="center">
      <v-col cols="12">
        <v-card raised :to="{ name: 'watch', params: { packageID: this.id } }">
          <v-row class="d-flex justify-center pa-2">
            <v-col cols="2" class="d-flex justify-center pa-2">
              <v-icon :color="this.favColor" large> heart-circle</v-icon>
            </v-col>
            <v-col cols="2">
              <v-img
                height="30vh"
                class="ma-1"
                :src="this.avatar"
                v-model="this.avatar"
                contain
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </v-col>
            <v-col cols="8">
              <span v-html="this.title" class="browser-result-title" />
              <p>
                <span
                  v-html="this.subtitle"
                  class="browser-result-description"
                />
              </p>
              <p><span v-html="this.data" class="browser-results-meta" /></p>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "BaseListItem",
  props: {
    favColor: String,
    avatar: String,
    data: String,
    subtitle: String,
    title: String,
    id: Number,
    action: String
  },
  computed: {
    goto(id) {
      return `/proplayer/${id}`;
    }
  },
  methods: {
    toggleFavoriteInBrowser() {}
  }
};
</script>

<style scoped>
.browser-result-title {
  font-size: 1.1rem !important;
  font-family: inherit !important;
  text-align: left !important;
  line-height: 1.1em !important;
  margin-top: 0 !important;
  color: #00aaff !important;
  text-decoration: none !important;
  font-weight: 600 !important;
}
.browser-result-description {
  font-size: 0.85rem !important;
  color: #888 !important;
  font-weight: 600 !important;
  line-height: 1.25em !important;
  margin: 0.25em 0 0.5em 0 !important;
}
.browser-result-meta {
  font-size: 0.7em !important;
  font-weight: 700 !important;
  color: #aaa !important;
  margin-top: 0.25em !important;
}

.browser-results-meta .meta-key {
  text-transform: uppercase !important;
  color: white !important;
  font-weight: 900 !important;
  margin-right: 0.25em !important;
}
.browser-results-meta .meta-wrapper {
  white-space: nowrap;
  margin-right: 0.5em;
}
.browser-results-meta .meta-value {
  font-size: 0.85rem !important;
  color: #888 !important;
  font-weight: 600 !important;
  line-height: 1.25em !important;
  margin: 0.25em 0 0.5em 0 !important;
}
</style>
