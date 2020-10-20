<template>
  <div class="row no-wrap q-pa-md" v-on="$listeners">
    <div class="column">
      <div class="text-overline q-mb-md">Settings</div>
      
      <q-btn
        label="Show Current Setup"
        color="secondary"
        @click="setup = true"
        outline
      />
       <q-dialog v-model="setup">
      <q-card class="my-card" :set="(img = getImage)">
        <q-img :src="img">
          
          <div class="absolute-bottom text-subtitle1 text-center">
        {{ img }}
          </div>
        </q-img>
        <q-card-section>
          <pre>{{ getSetup }}</pre>
        </q-card-section>
      </q-card>
    </q-dialog>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return { setup: false};
  },
  watch: {
    truncate: function() {
      this.$root.$emit("toggle-truncate");
    },
    filtered: function() {
      this.$root.$emit("toggle-filtered");
    }
  },
  
  computed: {
    getSetup() { return this.$store.state.watch.currentSetup },
    getImage() { 
      const num = Math.floor(Math.random() * 50)
      return `https://picsum.photos/id/${num}/500/300`
    },
  },
  methods: {
  }
};
</script>
