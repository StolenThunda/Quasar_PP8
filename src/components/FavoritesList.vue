<template>
<div>
 <div class="q-pa-md" style="max-width: 350px" v-for="(item, i) in Object.keys(favorites)" :key="i">
    <q-list  v-model="favorites" dense bordered padding class="rounded-borders">
     <q-item-label header> {{ item }} </q-item-label>
      <q-item  v-for="favorite in favorites[item]" :key="favorite.name" clickable v-ripple>
        <q-item-section  @click="playMedia(favorite.id)" top side >
          <q-btn icon="play_circle_filled" color="primary" size="xs" round />
        </q-item-section>

        <q-item-section>
          {{ favorite.title }}
        </q-item-section>
       
        <q-item-section color="grey" @click="removeFavorite(favorite.id)" top side>
          <q-btn icon="delete" color="red" size="xs" round/>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
  </div>
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
        // const ret =  this.removeFavorite(id)
        // console.log(ret);
        console.log(`Removing ${id}`);
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
