<template>
  <div :style="showCurrent ? 'padding-top: 66px' : ''">
    <span class="text-h6">{{ title }}</span>
    <slot name="header-pages"></slot>
    <q-list v-model="resultList">

      <q-intersection
        v-for="entry in resultList"
        :key="entry.id"
        transition="slide-right"
      >
        <q-card class="q-mb-xs" bordered flat>

          <q-item class="browser-result-wrapper"  >
            <q-item-section             
              v-model="entry.avatar"
              @hover="toggler"
              avatar
            >
              <q-btn
                class="browser-result-fav-wrapper q-ml-lg"
                :color="isFavorite(entry) ? 'negative' : 'primary'"
                icon="favorite"
                title="Toggle Favorite"
                round
                push
               @click="toggleFavorite(entry)"
              />
            </q-item-section>
            <q-item :to="lnk(entry)" clickable v-ripple style="width:100%">
              <!-- {{ entry }} -->
              <q-item-section avatar>
                <q-img
                  class="browser-result-image img"
                  :src="entry.avatar"
                  width="150px"
                  contain
                >
                  <template v-slot:loading>
                    <q-spinner-bars color="white" />
                  </template>
                </q-img>
              </q-item-section>
              <q-item-section class="browser-result-text-wrapper">

                <q-item-label
                  text-color="secondary"
                  class="text-weight-bolder text-body2 browser-result-title"
                >
                  {{ entry.title }}
                </q-item-label>
                <q-item-label
                  color="secondary"
                  class="text-thin browser-result-description"
                >
                  {{ entry.subtitle }}
                </q-item-label>
                <div class="browser-result-meta" v-html="entry.data"></div>
              </q-item-section>
            </q-item>
          </q-item>
        </q-card>
      </q-intersection>
    </q-list>
    <slot name="footer-pages"></slot>
    <q-page-sticky
      position="top-right"
      expand
      :offset="[18, 10]"
      v-if="showCurrent"
    >
      <!-- <q-fab label="Current Filters" title="View Current Filters" glossy color="primary" direction="left">
        <q-fab-action hide-label square> -->
      <current-search />
      <!-- </q-fab-action>
      </q-fab> -->
    </q-page-sticky>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ResultList",
  props: {
    resultList: Array,
    title: String,
    hideCurrent: {
      type: Boolean,
      default: () => false
    }
  },
  computed: {
    showCurrent() {
      return this.$store.state.browser.searching && !this.hideCurrent;
    },
    ...mapGetters("default", ["isFavorite"])
  },
  components: {
    CurrentSearch: () => import("components/browse/CurrentSearch")
  },
  methods: {
    lnk(entry) {
      const isYoutubeVid = entry.avatar.indexOf("youtube") >= 0;
      const lnk = isYoutubeVid
        ? `/watch/${entry.id}/${entry.id}`
        : `/watch/${entry.id}`;
      return lnk;
    },
    toggler(e) {
      console.log(e.currentTarget);
    },
    ...mapActions("default", ["toggleFavorite"]),
  }
};
</script>

<style lang="scss" scoped>
.browser-result-wrapper {
  position: relative;
  width: 100%;
}

.browser-result-image {
  float: left;
  margin-left: 2.5rem;
}

.browser-result-image img {
  width: 100%;
}

.browser-result-text-wrapper {
  position: relative;
  text-align: left;
  line-height: 1em;
  left: 0;
  margin-right: 1rem;
  margin-left: 4rem;
}


.browser-result-title {
  font-size: 1.1rem;
  font-family: inherit;
  text-align: left;
  line-height: 1.1em;
  margin-top: 0;
  color: white;
  font-weight: 600;
}

.browser-result-description {
  font-size: 0.85rem;
  color: #888;
  font-weight: 600;
  line-height: 1.25em;
  margin: 0.25em 0 0.5em 0;
}

.browser-result-meta {
  font-size: 0.85em;
  color: #bbb;
}

.browser-result-meta .meta-wrapper {
  white-space: nowrap;
  margin-right: 0.5em;
}

.browser-result-meta .meta-key {
  text-transform: uppercase;
  color: white;
  font-weight: 900;
  margin-right: 0.25em;
}

.browser-result-wrapper .meta-wrapper.chapters-meta,
.browser-result-wrapper .meta-wrapper.loops-meta,
.browser-result-wrapper .meta-wrapper.user-loops-meta {
  display: none;
}

.browser-result-wrapper.has-chapters .meta-wrapper.chapters-meta,
.browser-result-wrapper.has-loops .meta-wrapper.loops-meta,
.browser-result-wrapper.has-user-loops .meta-wrapper.user-loops-meta {
  display: initial;
}
</style>
