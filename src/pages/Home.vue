
<template>
 
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
