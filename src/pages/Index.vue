<template>
  <q-page class="column no-wrap justify-start justify-start items-center">
    <div v-if="$auth.isAuthenticated">
      <welcome-panel @toggle-drawer="$emit('toggle-drawer')" />
      <resume-panel />
      <notification-panel />
    </div>
    <div class="q-pa-md">
    <q-img
      src="https://cdn.quasar.dev/img/parallax2.jpg"
      spinner-color="white"
      style="height: 170px; max-width: 300px"
      img-class="my-custom-image"
      class="rounded-borders"
    >
      <div class="absolute-bottom text-subtitle1 text-center">
        Caption
      </div>
    </q-img>
  </div>
  
    <!-- <div class="col-6" v-else>
      <q-img
        src="https://cdn.texasbluesalley.com/styles/TXBALogo.svg"
        style="width: 100%"
      >
        <div class="absolute-bottom text-subtitle1 text-center">
          <h3 class="text">Welcome to</h3>
        </div>
      </q-img>
    </div> -->
    <!-- <div class="q-ma-md q-pa-md container">
      
      <q-img
        src="https://cdn.texasbluesalley.com/styles/TXBALogo.svg"
        spinner-color="primary"
        spinner-size="82px"
        class="image"
      >
      </q-img>
    </div> -->
  </q-page>
</template>

<script>
export default {
  name: "Index",
  components: {
    "welcome-panel": () => import("../components/index/Welcome"),
    "resume-panel": () => import("../components/index/Resume"),
    "notification-panel": () => import("../components/index/Notifications")
  }
};
</script>
 
<style lang="sass" scoped>
 .container 
    background-image: url('../assets/txba_logo.jpg')
    filter: blur(1px) sepia()
</style>
