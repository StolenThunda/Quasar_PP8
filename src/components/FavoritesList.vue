<template>
  <q-list dense>
    <q-expansion-item
      :label="item"
      expand-icon-toggle
      header
      class="q-pa-md"
      style="max-width: 350px"
      v-for="(item, i) in Object.keys(favorites)"
      :key="i"
    >
      <q-list
        v-model="favorites"
        class="rounded-borders"
        dense
        bordered
        padding
      >
        <q-item v-for="favorite in favorites[item]" :key="favorite.name">
          <q-item-section top side>
            <q-btn
              icon="play_circle_filled"
              color="secondary"
              size="xs"
              round
              :to="'/watch/' + favorite.id"
            />
          </q-item-section>

          <q-item-section>
            {{ favorite.title }}
          </q-item-section>

          <q-item-section
            color="grey"
            @click="removeFavorite(favorite.id)"
            top
            side
          >
            <q-btn icon="delete" color="red" size="xs" round />
          </q-item-section>
        </q-item>
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
    removeFavorite(id) {
      //TODO: Code removal of favs
      // const ret =  this.removeFavorite(id)
      // console.log(ret);
      console.log(`Removing ${id}`);
    },
    ...mapActions(["removeFavorite"])
  }
};
</script>
