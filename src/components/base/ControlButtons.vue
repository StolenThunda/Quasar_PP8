<template>
  <div>
    <q-btn dense flat icon="minimize" @click="minimize" />
    <q-btn dense flat icon="crop_square" @click="maximize" />
    <q-btn dense flat icon="close" @click="closeApp" />
  </div>
</template>

<script>
import electron_funcs from "../../mixins/electron_funcs.js";
export default {
  mixins: [electron_funcs]
};
</script>

<style></style>
