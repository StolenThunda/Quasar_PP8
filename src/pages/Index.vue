<template>
  <v-container>
    <v-layout row>
      <v-flex><Welcome user="Antonio" /> </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex><Resume /> </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex><InfoTabs /> </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Welcome from "../components/index/Welcome";
import Resume from "../components/index/Resume";
import InfoTabs from "../components/index/InfoTabs";
export default {
  name: "Default",
  components: {
    Welcome,
    Resume,
    InfoTabs
  }
};
</script>

<style lang="scss" scoped></style>
