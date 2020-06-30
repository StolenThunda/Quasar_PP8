<template>
     <q-card class="pa-5 col-md-8 offset-md-2">
      <q-tabs id="site-updates" q-model="tab" centered icons-and-text>
        <q-tabs-slider></q-tabs-slider>

        <q-tab name="the_word" icon="bell_alert" label="Announcements" />

        <q-tab name="updates" icon="calendar_multiple_check" label="Course Updates" />
      </q-tabs>

      <q-tabs-items q-model="tab" q-if="notifications" outlined>
        <q-tab-item
          id="the_word"
          q-for="item in notifications.announcements"
          :key="'a_' + item.id"
        >
          <notification-item q-bind="item" />
        </q-tab-item>
        <q-tab-item
          id="updates"
          q-for="item in notifications.updates"
          :key="'u_' + item.id"
          outlined
        >
          <notification-item q-bind="item" />
        </q-tab-item>
      </q-tabs-items>
    </q-card>
</template>

<script>
    import NotificationItem from "../components/NotificationItem";
    export default {
        components: {
            'notification-item': NotificationItem
        }
    }
</script>

<style lang="scss" scoped>

</style>