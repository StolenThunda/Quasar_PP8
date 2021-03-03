<template>
  <div class="col">
    <q-tabs id="site-updates" v-model="tab">
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
        <q-intersection
          v-for="item in notifications.announcements"
          :key="'a_' + item.id"
          transition="scale"
          class="example-item"
        >
          <notification-item v-bind="item" />
        </q-intersection>
      </q-tab-panel>

      <q-tab-panel name="updates" outlined>
        <q-intersection
          v-for="item in notifications.updates"
          :key="'u_' + item.id"
        >
          <notification-item v-bind="item" />
        </q-intersection>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import NotificationItem from "components/index/NotificationItem"
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
    NotificationItem
  },
  computed: {
    ...mapState(["notifications"])
  }
};
</script>

<style lang="scss" scoped></style>
