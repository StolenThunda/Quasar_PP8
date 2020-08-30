<template>
  <q-page class="column no-wrap justify-start justify-start items-center">
    <welcome-panel />
    <resume-panel />
    <notification-panel />
  </q-page>
</template>

<script>
export default {
  name: 'Index',
  components: {
    "welcome-panel": () => import( "../components/index/Welcome"),
    "resume-panel" : () => import("../components/index/Resume"),
    "notification-panel" : () => import("../components/index/Notifications")
  }
}
</script>
