<template>
  <v-sheet>
    <v-card outlined>
      <v-card-title>PDF VIEWR</v-card-title>
      <v-card-text v-text="this.$route.params.file"></v-card-text>
      <v-card-actions>
        <v-btn @click="test">Console.log()</v-btn>
      </v-card-actions>
    </v-card>
    <v-card v-model="iframe.loaded" outlined>
      <iframe
        id="pdf-viewer"
        type="application/pdf"
        width="1000"
        height="800"
        src="`//texasbluesalley.com/includes/pdfjs/web/viewer.html?file=/assets/pdfs/${this.$route.params.file}`"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </v-card>
  </v-sheet>
</template>

<script>
export default {
  data: () => ({
    iframe: {
      file: null,
      loaded: false
    }
  }),
  mounted() {
    let url = `https://texasbluesalley.com/includes/pdfjs/web/viewer.html?file=/assets/pdfs/${this.$route.params.file}`;
    document.getElementById("pdf-viewer").src = url;
    this.iframe.loaded = true;
  },
  methods: {
    test() {
      console.log(this.$route.params);
      return this.$route.params;
    }
  }
};
</script>

<style lang="scss" scoped></style>
