<template>
  <v-card class="searchResults d-flex flex-no-wrap justify-space-between">
    <v-list-item :to="{ name: 'watch', params: { packageID: this.id } }">
      <v-btn class="mx-2" dark icon color="error" :disabled="this.isFav">
        <v-icon>fa fa-inverse fa-heart fa-stack-1x</v-icon>
      </v-btn>
      <v-img
        max-height="150"
        max-width="75"
        class="ma-5"
        :src="this.avatar"
        v-if="this.avatar"
        contain
      >
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
      <v-list-item-content>
        <v-list-item-title
          v-html="this.title"
          class="resultTitle"
        ></v-list-item-title>
        <v-list-item-subtitle v-html="this.subtitle"></v-list-item-subtitle>
        <v-container
          v-if="this.data"
          v-html="this.data"
          class="resultDesc"
        ></v-container>
      </v-list-item-content>

      <v-list-item-action v-if="this.action">
        <v-btn icon>
          <v-icon color="error lighten-1">fas fa-minus-circle</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  name: "BaseListItem",
  data: () => ({
    show: false
  }),
  props: {
    isFav: Boolean,
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

<style lang="scss" scoped>
.resultTitle {
  color: #00aaff !important;
  font-size: 1.5rem !important;
  font-weight: 500 !important;
  line-height: 1.7rem !important;
}
.resultDesc {
  font: outline;
  line-height: 1.5rem;
}
.browser-result-meta {
  align-items: stretch;
  display: flex;
  // float: left;
}
</style>
