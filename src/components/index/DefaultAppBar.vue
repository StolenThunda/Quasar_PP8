<template>
  <v-toolbar>
    <slot name="toggle" />
    <q-icon name="home</v-icon>
    <v-spacer></v-spacer>
    <v-toolbar-title>TXBA ProPlayer v8</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn :to="{ name: 'browser' }" class="ma-2" text icon>
      <q-icon name="magnify</v-icon>
    </v-btn>
    <ToolList />
  </v-toolbar>
</template>

<script>
import ToolList from "../components/base/ToolList";
export default {
  name: "DefaultAppBar",
  components: {
    ToolList
  },
  computed: {}
};
</script>

<style lang="scss" scoped></style>
