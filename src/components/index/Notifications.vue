<template>
  <div class="q-mt-sm">
    <q-tabs id="site-updates" v-model="tab" dense>
      <q-tab name="the_word" label="Announcements" />
      <q-tab name="updates" label="Course Updates" />
    </q-tabs>

    <q-tab-panels
      v-model="tab"
      v-if="notifications"
      class="shadow-2 rounded-borders"
      animated
    >
      <q-tab-panel name="the_word">
        <notification-item
          v-for="item in notifications.announcements"
          :key="'a_' + item.id"
          v-bind="item"
        />
      </q-tab-panel>

      <q-tab-panel name="updates" outlined>
        <notification-item
          v-for="item in notifications.updates"
          :key="'u_' + item.id"
          v-bind="item"
        />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("default");

export default {
  data() {
    return {
      tab: "the_word",
      show: false,
      splitterModel: 25
    };
  },
  components: {
    NotificationItem: () => import("components/index/NotificationItem")
  },
  computed: {
    ...mapState(["notifications"])
  }
};
</script>

<style lang="scss" scoped></style>
