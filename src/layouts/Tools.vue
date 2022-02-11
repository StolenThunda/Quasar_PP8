<template>
  <!--q-layout view="hHh lpR fFf">  <q-layout view="hHh Lpr lff"> -->
  <div class="q-pa-md">
     <q-layout view="lHh Lpr lff">
    <q-header elevated reveal>
      <q-toolbar >
        <q-toolbar-title class="text-capitalize text-subtitle2">
          {{ $route.meta.name }}
        </q-toolbar-title>
        <q-btn label="Close" color="secondary" icon="close" to="/" />
      </q-toolbar>
    </q-header>

    <q-page-container>
    <!-- //  <q-scroll-area> -->
      <router-view />
      <!-- // </q-scroll-area> -->
    </q-page-container>
  </q-layout>
  </div>
   
</template>

<script>
export default {
  name: "ToolsLayout"
};
</script>
