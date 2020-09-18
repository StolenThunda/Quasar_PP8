<template>
  <div id="q-app" class="d-flex flex-column h-100">
  <div class="container flex-grow-1">
      <error />
      <div class="mt-5">
    <router-view :key="$route.fullPath" />
      </div>
    </div>
  </div>
</template>

<script>
import  Error  from "./components/index/Error"
export default {
  // name: "App",
  components: {
    Error
  }
};
</script>

<style>
* {
    font-family: Oswald,"Open Sans","Lucida Grande","Lucida Sans Unicode",Helvetica,Sans-Serif ;
}
</style>