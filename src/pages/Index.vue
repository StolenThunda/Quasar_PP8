<template>
  <q-page class="column no-wrap justify-start justify-start">
    <div v-if="loggedIn">
      <welcome-panel @toggle-drawer="$emit('toggle-drawer')" />
      <resume-panel />
      <notification-panel />
    </div>
    <div class="q-pa-md" v-else> 
      <span class="text-bold text-h4" >Welcome </span>
    <!-- <q-carousel
      v-model="slide"
      transition-prev="fade"
      transition-next="fade"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
      height="70vh"
      infinite
      autoplay
      animated
      arrows
      padding
    >
      <q-carousel-slide :name="1" img-src="https://cdn.texasbluesalley.com/styles/TXBALogo.svg" />
      <q-carousel-slide :name="2" img-src="https://cdn.texasbluesalley.com/misc/locals-page/AllCourses-1600px.jpg" />
      <q-carousel-slide :name="3" img-src="https://txba-media.s3.amazonaws.com/woodshed/course-type-images/SRV-800.jpg" />
      <q-carousel-slide :name="4" img-src="https://txba-media.s3.amazonaws.com/woodshed/course-type-images/Influences-800.jpg" />
    </q-carousel> -->

  </div>  
  </q-page>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Index",
  components: {
    "welcome-panel": () => import("../components/index/Welcome"),
    "resume-panel": () => import("../components/index/Resume"),
    "notification-panel": () => import("../components/index/Notifications"),
  },
  data ()
     {
    return {
      card: true,
      stars: 3,
      slide: 1,
      autoplay: true
    }
  },
  computed: {
    ...mapState('auth', ['loggedIn'])
  }
};
</script>

<style lang="scss" scoped>
  .q-carousel__slide {
    background-repeat: no-repeat;
    background-size: auto;
    // filter: blur(1px) sepia()
  }
</style>
