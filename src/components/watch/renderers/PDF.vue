<template>
<q-page class="flex flex-center">
  <h1>PDF Viewer</h1>
    <q-pdfviewer
      v-model="show"
      type="html5"
      :src="src"
      content-class="absolute"
    />
  </q-page>
    <!-- <div id="video-player-wrapper" class="no-controls">
      <iframe
        width="1000"
        height="800"
        :src="src"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div> -->
</template>

<script>
export default {
  name: "PDF_Renderer",
  props: ["src"],
  data: () => ({ show: true })
};
</script>
