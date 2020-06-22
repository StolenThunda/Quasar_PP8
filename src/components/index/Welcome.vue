<template>
  <v-card class="my-5 pa-5 col-md-8 offset-md-2">
    <v-layout row justify="center" align="center">
      <v-flex row class="pa-3">
        <div class="greeting">
          <H2>
            Welcome, <span v-if="user">{{ user }}</span>
            <span v-else> please LOGIN</span>
          </H2>
        </div>
      </v-flex>
      <v-flex class="offset-md-2">
        <v-container>
          <v-row class="justify-space-between">
            <v-btn id="orientation" color="success">
              <v-icon left> play-circle-outline</v-icon>Orientation </v-btn
            ><v-spacer></v-spacer>
            <v-btn
              id="showFav"
              color="primary"
              @click="$root.$emit('toggleSidebar')"
            >
              <v-icon left> heart</v-icon>Favorites </v-btn
            ><v-spacer></v-spacer>
            <v-btn id="browse" color="primary" :to="{ name: 'browser' }">
              <v-icon left> magnify</v-icon>Browse
            </v-btn>
          </v-row>
        </v-container>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  props: {
    user: String
  }
};
</script>
