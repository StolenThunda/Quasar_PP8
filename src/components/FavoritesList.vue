<template>
  <q-list v-if="favs !== null" dense>
    <template v-for="(item, i) in Object.keys(favs)">
      <q-expansion-item
        :key="i"
        group="accordion"
        class="text-capitalize text-body2 section-header"
        header-style="background-color:#464646; min-width: 250px;"
        style="max-width: 350px"
        switch-toggle-side
      >
        <template #header>
          {{ item }}
          <q-space />
          <q-badge color="accent" floating>{{ favs[item].length }} </q-badge>
        </template>
        <q-list class="q-py-sm rounded-borders" bordered dense>
          <template v-for="fav in favs[item]">
            <q-item :key="fav.name" class="q-mx-none ">
              <!-- <pre>{{fav}}</pre> -->
              <q-item-section avatar>
                <q-btn
                  icon="play_circle_filled"
                  color="secondary"
                  size="xs"
                  round
                  @click="link(fav)"
                />
              </q-item-section>
              <q-item-section :title="fav.title">
                {{ fav.title }}
              </q-item-section>

              <q-item-section color="grey" @click="removeFavorite(fav)" side>
                <q-btn icon="delete" color="red" size="xs" round />
              </q-item-section>
            </q-item>
            <q-separator :key="fav.id" />
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
      this.setFavs();
    }
  },
  computed: {
    ...mapState("default", ["favorites"])
  },
  methods: {
    link(fav) {
      this.playSegment(fav.id).then(id => {
        const route =
          fav.src !== "Imported" ? `/watch/${id}` : `/watch/${id}/${id}`;
        console.log("link_route", route);
        this.$router.push({ path: `${route}` });
      });
    },
    setFavs() {
      this.favs = this.$store.getters["default/getFavsByType"];
    },
    ...mapActions("default", ["removeFavorite"]),
    ...mapActions("watch", ["playSegment"])
  }
};
</script>
