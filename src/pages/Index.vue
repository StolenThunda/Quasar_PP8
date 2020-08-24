<template>
  <q-page class="column no-wrap justify-start justify-start items-center">
    <welcome-panel />
    <resume-panel />
    <!-- <notification-panel />-->
  </q-page>
</template>

<script>
import Welcome from "../components/index/Welcome";
import Resume from "../components/index/Resume";
// import Notifications from "../components/Notifications";
export default {
  name: 'PageIndex',
  components: {
    "welcome-panel": Welcome,
    "resume-panel" : Resume,
    // "notification-panel" : Notifications
  }
}
</script>
