<template>
  <v-list v-model="favorites" dense>
    <v-list-group v-for="(item, i) in Object.keys(favorites)" :key="i">
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title>{{ item }}</v-list-item-title>
        </v-list-item-content>
      </template>
      <v-list-item v-for="favorite in favorites[item]" :key="favorite.name">
        <v-list-item-avatar>
          <v-icon class="ma-4" @click="playMedia(favorite.id)" small>
            play-circle</v-icon
          >
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-subtitle v-html="favorite.title"></v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-list-item-icon>
            <v-list-item-avatar>
              <v-icon
                class="pb-2"
                color="error"
                @click="removeFavorite(favorite.id)"
                small
              >
                minus-circle</v-icon
              >
            </v-list-item-avatar>
          </v-list-item-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list-group>
  </v-list>
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
    playMedia(id) {
      this.$router.push(`/watch/${id}`);
    },
    removeFavorite(id) {
      const ret = this.removeFavorite(id);
      console.log(ret);
    },
    ...mapActions(["removeFavorite"])
  }
};
</script>

<style scoped>
/* .fav_list {
    margin: 0;
    padding: 0;
    line-height: 1.4rem;
    font-weight: 600;
    border-bottom: 1px solid #555;
    color: #ddd;
  }
  v-list--item {
  font-weight: bolder !important;
  font-size: 2em;
  height: 55px;
  width: 100vw;
} */
</style>
