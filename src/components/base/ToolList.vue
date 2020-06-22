<template>
  <v-menu left bottom>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" class="ma-2" text icon>
        <q-icon name="cogs</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-list dense>
        <v-subheader>Tools</v-subheader>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon left> music</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            Guitar Tuner
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon left> bug</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            Spider Drills Tool
          </v-list-item-content>
        </v-list-item>

        <v-divider />

        <v-subheader>Import</v-subheader>
        <v-list-item>
          <v-avatar>
            <v-icon left> youtube</v-icon>
          </v-avatar>
          <v-list-item-content>
            Load Youtube Video
          </v-list-item-content>
        </v-list-item>

        <v-divider />

        <v-subheader>Account</v-subheader>
        <v-list-item @click="go('account')">
          <v-avatar>
            <v-icon left> account-circle</v-icon>
          </v-avatar>
          <v-list-item-content>
            <v-list-item-title>
              Account Dashboard
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="go('forum')">
          <v-avatar>
            <v-icon left> account-group</v-icon>
          </v-avatar>
          <v-list-item-content>
            Local Forums
          </v-list-item-content>
        </v-list-item>

        <v-divider />
        <v-subheader>Update</v-subheader>
        <v-list-item @click="refresh">
          <v-avatar>
            <v-icon left> refresh</v-icon>
          </v-avatar>
          <v-list-item-content>
            Force Refresh
          </v-list-item-content>
        </v-list-item>

        <LightDark />
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
import LightDark from "../components/base/LightDark";
export default {
  components: {
    LightDark
  },
  methods: {
    refresh() {
      window.location.reload(true);
    },
    go(dest) {
      window.open(`https://texasbluesalley.com/${dest}`);
    }
  }
};
</script>

<style lang="scss" scoped></style>
