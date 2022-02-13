<template>
  <!--q-layout view="hHh lpR fFf">  <q-layout view="hHh Lpr lff"> -->
  <div class="q-pa-md">
     <q-layout view="lHh Lpr lff">
    <q-header elevated reveal>
      <q-toolbar >
        <q-btn
        color="secondary"
        icon="menu"
        aria-label="menu"
        @click="retrieveDrawer = !retrieveDrawer"
      />
        <q-toolbar-title class="text-capitalize text-subtitle2">
          {{ $route.meta.name }}
        </q-toolbar-title>
        
        <q-btn label="Close" color="secondary" icon="close" to="/" />
      </q-toolbar>
    </q-header>

    <q-page-container>
    <!-- //  <q-scroll-area> -->
      <router-view :fetchDrawer="retrieveDrawer" />
      <!-- // </q-scroll-area> -->
    </q-page-container>
  </q-layout>
  </div>
   
</template>

<script>
export default {
  name: "ToolsLayout",
  data: () => ({
    retrieveDrawer: false
  })
};
</script>
