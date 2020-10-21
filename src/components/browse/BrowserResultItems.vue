<template>
  <q-page padding style="padding-top: 66px">
    <span class="text-h6">{{ title }}</span>
    <slot name="header-pages"></slot>
    <q-list dense>
      <q-intersection
        v-for="entry in this.resultList"
        :key="entry.id"
        transition="slide-right"
      >
        <q-card bordered flat>
          <q-item>
            <q-item-section
              v-model="entry.avatar"
              :set="
                (fav = JSON.stringify({
                  id: entry.id,
                  title: entry.title.trim()
                }))
              "
              avatar
            >
              <q-btn
                :color="isFavorite(fav) ? 'negative' : 'primary'"
                icon="favorite"
                title="Toggle Favorite"
                round
                push
              />
            </q-item-section>

            <q-item :to="'/watch/' + entry.id" clickable v-ripple>
              <q-item-section side>
                <q-avatar size="4rem" square>
                  <q-img :src="entry.avatar" contain />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label
                  text-color="secondary"
                  class="text-weight-bolder text-body2"
                >
                  {{ entry.title }}
                </q-item-label>
                <q-item-label color="secondary" class="text-thin ">
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
      v-if="$store.state.browser.searching"
    >
      <!-- <q-fab label="Current Filters" title="View Current Filters" glossy color="primary" direction="left">
        <q-fab-action hide-label square> -->
      <current-search />
      <!-- </q-fab-action>
      </q-fab> -->
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    resultList: Array,
    title: String
  },
  computed: {
    images() {
      return this.resultList.length > 0;
    },
    ...mapGetters("default", ["isFavorite"])
  },
  components: {
    CurrentSearch: () => import("components/browse/CurrentSearch")
  }, 
  methods: {
    ...mapActions('default', ['toggleFavorite'])
  }
};
</script>

<style lang="scss" scoped>
.img {
  height: 140px;
  max-width: 150px;
}
.browser-result-meta .meta-wrapper {
  white-space: nowrap !important;
  margin-right: 0.5em;
  font-size: 1.2em !important;
  font-weight: 700 !important;
  margin-top: 0.25em !important;
}
span.meta-key {
  color: white !important;
}
span.meta-value {
  font-weight: 200 !important;
  color: #aaa !important;
}
</style>
