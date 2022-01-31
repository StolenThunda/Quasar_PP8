<template>
<q-page class="flex flex-center">
  <h1>PDF Viewer</h1>
    <q-pdfviewer
      type="html5"
      :src="src"
      content-class="absolute"
    />
  </q-page>
</template>

<script>
export default {
  name: "PDF_Renderer",
  props: ["src"],
};
</script>
