<template>
  <q-list v-if="favs !== null" dense>
    <template v-for="(item, i) in Object.keys(favs)">
      <q-expansion-item
        group="accordion"
        class="text-capitalize text-body2 section-header"
        header-style="background-color:#464646; min-width: 250px;"
        style="max-width: 350px"
        :key="i"
        switch-toggle-side
      >
        <template #header>
          {{ item }}
          <q-space />
          <q-badge color="accent" floating>{{ favs[item].length }} </q-badge>
        </template>

        <q-list class="q-py-sm  rounded-borders" bordered dense>
          <template v-for="favorite in favs[item]">
            <q-item :key="favorite.name" class="q-mx-none">
              <q-item-section avatar>
                <q-btn
                  icon="play_circle_filled"
                  color="secondary"
                  size="xs"
                  round
                  :to="'/watch/' + favorite.id"
                />
                <!-- :to="getLink(item, favorite.id)" -->
              </q-item-section>
              <q-item-section :title="favorite.title">
                {{ favorite.title }}
              </q-item-section>

              <q-item-section
                color="grey"
                @click="removeFavorite(favorite.id)"
                side
              >
                <q-btn icon="delete" color="red" size="xs" round />
              </q-item-section>
            </q-item>
            <q-separator :key="favorite.id" />
          </template>
        </q-list>
      </q-expansion-item>
    </template>
  </q-list>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "FavList",
  data: () => ({
    favs: null
  }),
  mounted() {
    this.setFavs();
  },
  watch: {
    favorites() {
      this.setFavs()
    }
  },
  computed: {
    ...mapState("default", ["favorites"])
  },
  methods: {
    setFavs() {
      this.favs = this.$store.getters["default/getFavsByType"];
    },
    ...mapActions("default", ["removeFavorite"])
  }
};
</script>
