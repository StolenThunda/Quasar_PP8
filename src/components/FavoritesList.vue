<template>
  <q-list dense>
    <q-expansion-item
      group="accordion"
      class="text-capitalize text-body2 section-header"
      header-style="background-color:#464646; min-width: 250px;"
      style="max-width: 350px"
      v-for="(item, i) in Object.keys(favorites)"
      :key="i"
      switch-toggle-side
    >
      <template #header>
        {{ item }}
        <q-space />
        <q-badge color="accent" floating>{{ favorites[item].length }} </q-badge>
      </template>
      <q-list
        v-model="favorites"
        class="q-py-sm  rounded-borders"
        bordered
        dense
      >
        <template v-for="favorite in favorites[item]">
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
  </q-list>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("default");
export default {
  name: "FavList",
  data: () => ({
    hover: true
  }),
  computed: {
    ...mapState(["favorites"])
  },
  methods: {
    ...mapActions(["removeFavorite"])
  }
};
</script>

<style scoped>
.fav-item {
  max-width: 150px;
}
</style>
