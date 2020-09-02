<template>
   <q-btn icon="fa fa-cogs" size="20px" color="secondary" flat>
        <q-menu  transition-show="flip-right"
          transition-hide="flip-left">
          <q-list style="min-width: 100px;" dense>
            <q-item>
              <q-item-label  caption>Tools</q-item-label>
            </q-item>
            <q-separator />

            <q-item v-ripple clickable>
              <q-item-section avatar>
                <q-icon name="fa fa-music" size="xs" />
              </q-item-section>

              <q-item-section>Guitar Tuner</q-item-section>
            </q-item>

            <q-item v-ripple clickable>
              <q-item-section avatar>
                <q-icon name="fa fa-bug" size="xs" />
              </q-item-section>

              <q-item-section>Spider Drills</q-item-section>
            </q-item>

            <q-separator />
            <q-item>
              <q-item-label  caption>Import</q-item-label>
            </q-item>
            <q-separator />

            <q-item v-ripple clickable>
              <q-item-section avatar>
                <q-icon name="fa fa-youtube" size="xs" />
              </q-item-section>

              <q-item-section>Load Youtube Video</q-item-section>
            </q-item>

          <q-separator />
          <q-item>
              <q-item-label  caption>Account</q-item-label>
            </q-item>
          <q-separator />
            <q-item v-ripple clickable>
            <q-item-section avatar>
                <q-icon name="fa fa-user-circle" size="xs" />
              </q-item-section>
              <q-item-section  @click="go('account')">Account Dashboard</q-item-section>
            </q-item>
            <q-item v-ripple clickable>
              <q-item-section avatar>
                <q-icon name="fa fa-users" size="xs" />
              </q-item-section>
              <q-item-section  @click="go('forum')">Locals Forums</q-item-section>
            </q-item>
            <q-separator />
          <q-item>
              <q-item-label  caption>Update</q-item-label>
            </q-item>
          <q-separator />
            <q-item v-ripple clickable>
               <q-item-section avatar>
                <q-icon name="fa fa-refresh" size="xs" />
              </q-item-section>
              <q-item-section @click="refresh">Force Refresh</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {}
  },
   methods: {
    refresh() {
      window.location.reload(true);
    },
    go(dest) {
      window.open(`https://texasbluesalley.com/${dest}`);
    }
   }
}
</script>

<style lang="sass" scoped>
.section-heading 
    text-transform: uppercase !important;
    font-weight: 900 !important;
    background: #777 !important;
    line-height: 1.25em !important;
    font-size: .8em !important;

</style>