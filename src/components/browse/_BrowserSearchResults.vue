<template>
  <div>
    Search Results - {{ title }}

    <q-list dense bordered>
      <q-card
         v-for="search_entry in this.search_entries"
          :key="search_entry.id"
      >
        <!-- {{  search_entry }} -->
        <q-separator spaced />
        <q-item>
          <q-item-section v-model="search_entry.avatar" avatar>
            <q-btn
              class="glossy"
              :color="search_entry.favColor"
              icon="favorite"
              round
              push
            />
          </q-item-section>

          <q-item  clickable v-ripple>
            <q-item-section side>
              <q-img width="100px" :src="search_entry.avatar" contain />
            </q-item-section>

            <q-item-section style="width: 60vw;">
              <q-item-label
                text-color="primary"
                class="text-weight-bolder text-body2"
              >
                {{ search_entry.title }}
              </q-item-label>
              <q-item-label class="text-subtitle1">
                {{ search_entry.subtitle }}
              </q-item-label>

              <span v-if="search_entry.data" v-html="search_entry.data">
              </span>
              <q-separator inset spaced />
            </q-item-section>
          </q-item>
        </q-item>
      </q-card>
    </q-list>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("browser");
export default {
  name: "BrowserDefaultResults",
  props: {
    title: String
  },
  data: () => ({
    results: null
  }),
  mounted() {
    this.loadDefaults();
  },
  computed: {
    ...mapState(["default_browser_entries", "search", "search_entries"])
  },
  methods: {
    loadDefaults() {
      this.results = this.fetchDefaultSearch();
    },
    ...mapActions(["fetchDefaultSearch"])
  }
};
</script>
