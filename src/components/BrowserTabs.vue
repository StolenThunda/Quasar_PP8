<template>
<q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="mails" label="Mails" />
          <q-tab name="alarms" label="Alarms" />
          <q-tab name="movies" label="Movies" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="mails">
            <div class="text-h6">Mails</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="alarms">
            <div class="text-h6">Alarms</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="movies">
            <div class="text-h6">Movies</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
<!-- 
   <q-list dense>
     <q-item-section>
       BrowserTabs
     </q-item-section>
  </q-list> -->
</template>

<script>

// import { createNamespacedHelpers } from "vuex";
// const { mapState, mapActions } = createNamespacedHelpers("browser");

export default {
  name: 'BrowserTabs',
  data () {
    return { tab: null }
  },
  // computed: {
  //   ...mapState(["search"])
  // },
  // created(){
  //   this.setCriteria();
  // },
  // methods: {
  //   toggle(chipData) {
  //     // console.log(chipData)
  //     this.toggleSearchCriteria(chipData);
  //     if (!this.isSearching) this.$root.$emit("toggleSearching");
  //   },
  //   ...mapActions(["toggleSearchCriteria", "setCriteria"])
  // }
}
</script>
