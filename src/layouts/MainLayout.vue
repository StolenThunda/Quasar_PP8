<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title>ProPlayer v8 </q-toolbar-title>
        <q-img
          class="logo"
          :src="logo"
          style="height: 60px; max-width: 100px"
          contain
        />

        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>
          Favorites List
        </q-item-label>
        <!-- <q-item>{{favorites}}</q-item> -->
        <q-expansion-item
          v-model="favorites"
          v-for="fav_type in Object.keys(favorites)"
          :key="fav_type"
          expand-separator
          :label="fav_type"
          header
        >
          Essential Links
        <FavList />
        <!-- <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        /> -->
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
// import EssentialLink from 'components/EssentialLink.vue'
import FavList from 'components/FavoritesList.vue';

export default {
  name: "MainLayout",

  components: {
    // EssentialLink
    FavList
  },

  data() {
    return {
      logo: "https://cdn.texasbluesalley.com/styles/TXBALogo.svg",
      leftDrawerOpen: false,
      favorites: null
    };
  },
  mounted() {
    this.$axios
      .get("./favs.json")
      .then(response => (this.favorites = response.data));
  }
};
</script>

<style scoped>
.logo {
  /* border-radius: 50%; */
  -webkit-transition: -webkit-transform 0.8s ease-in-out;
  transition: transform 0.8s ease-in-out;
}
.logo:hover {
  -webkit-transform: rotate(360deg);
  transform: rotate(360deg);
}
</style>
