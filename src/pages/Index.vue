<template>
  <q-page class="column no-wrap justify-start justify-start">
    <div v-if="loggedIn">
      <welcome-panel @toggle-drawer="$emit('toggle-drawer')" />
      <resume-panel />
      <notification-panel />
    </div>
    <div class="q-pa-md" v-else> 
      <span class="text-bold text-h4" >Welcome </span>
   

  </div>  
  </q-page>
</template>

<script>
import WelcomePanel from "components/index/Welcome.vue"
import ResumePanel from "components/index/Resume.vue"
import NotificationPanel from "components/index/Notifications.vue"
import { mapState } from "vuex";
export default {
  name: "Index",
  components: { WelcomePanel, ResumePanel, NotificationPanel },
  data: () => ({
      card: true,
      stars: 3,
      slide: 1,
      autoplay: true
    }),
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
