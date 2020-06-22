<template>
  <v-row align="center" no-gutters>
    <v-card class="pa-5 col-md-8 offset-md-2">
      <v-tabs id="site-updates" v-model="tab" centered icons-and-text>
        <v-tabs-slider></v-tabs-slider>

        <v-tab href="#the_word">
          Announcements
          <q-icon name="bell-alert</v-icon>
        </v-tab>

        <v-tab href="#updates">
          Course Updates
          <q-icon name="calendar-multiple-check</v-icon>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab" v-if="notifications" outlined>
        <v-tab-item
          id="the_word"
          v-for="item in notifications.announcements"
          :key="'a_' + item.id"
        >
          <NotificationItem v-bind="item" />
        </v-tab-item>
        <v-tab-item
          id="updates"
          v-for="item in notifications.updates"
          :key="'u_' + item.id"
          outlined
        >
          <NotificationItem v-bind="item" />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-row>
</template>

<script>
import NotificationItem from "../../components/base/NotificationItem";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("default");

export default {
  data() {
    return {
      tab: null,
      show: false
    };
  },
  components: {
    NotificationItem
  },
  computed: {
    ...mapState(["notifications"])
  }
};
</script>
