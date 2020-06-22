<template>
  <v-btn-toggle class="controls" dark>
    <v-btn large outlined @click="send('playerPlay')">
      <v-icon large>
        {{ isPlaying ? " pause" : " play" }}
      </v-icon>
    </v-btn>
    <v-btn large outlined @click="send('playbackRestart')">
      <v-icon>fa fa-fast-backward</v-icon>
    </v-btn>
    <v-btn large outlined @click="send('playbackRewind5')">
      <v-icon class="mr-1">fa fa-backward</v-icon><sup>5</sup>
    </v-btn>
    <v-btn large outlined @click="send('playbackForward5')">
      <v-icon class="mr-1">fa fa-forward</v-icon><sup>5</sup>
    </v-btn>
    <!-- <v-btn large outlined @click="setLoopStart">
            <v-icon>[ A </v-icon>
          </v-btn>
          <v-btn large outlined @click="setLoopEnd">
            <v-icon>B ]</v-icon>
          </v-btn>
          <v-btn large outlined @click="toggleLooping">
            <v-icon>fa fa-sync-alt</v-icon>
          </v-btn> -->
    <v-btn large outlined>
      <q-icon name="cog</v-icon>
    </v-btn>
  </v-btn-toggle>
</template>

<script>
export default {
  data: () => ({
    isPlaying: false
  }),
  mounted() {
    this.$root.$on("isPlaying", () => {
      this.isPlaying = !this.isPlaying;
    });
  },
  methods: {
    send: evt => this.$emit(evt)
  }
};
</script>

<style lang="scss" scoped></style>
