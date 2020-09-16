<template>
  <q-page class="column no-wrap justify-start justify-start items-center">
    <div v-if="$auth.isAuthenticated">
    <welcome-panel @toggle-drawer="$emit('toggle-drawer')" />
    <resume-panel />
    <notification-panel />
    </div>
    <div class="q-ma-md q-pa-md container" v-else>
      <h3 class="text">Welcome to</h3>
      <q-img
        src="https://cdn.texasbluesalley.com/styles/TXBALogo.svg"
        spinner-color="primary"
        spinner-size="82px"
        class="image"
      >
      </q-img>
    </div>
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

<style lang="scss" scoped>
.container {
  position: relative;
  width: 90vw;
}

.image {
  opacity: 0.4;
  display: block;
  width: 100%;
  height: auto;
  transition: 0.5s ease;
  backface-visibility: hidden;
}

// .middle {
//   transition: .5s ease;
//   opacity: 0;
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   -ms-transform: translate(-50%, -50%);
//   text-align: center;
// }

// .container:hover .image {
//   opacity: 0.3;
// }

// .container:hover .middle {
//   opacity: 1;
// // }

// .text {
//   background-color: "primary";
//   color: white;
//   // font-size: 16px;
//   padding: 16px 32px;
// }
</style>
