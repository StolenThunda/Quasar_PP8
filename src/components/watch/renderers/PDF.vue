<template>
  <div id="video-player-wrapper" class="no-controls">
    <div id="video-player-wrapper" class="no-controls">
      <iframe
        width="1000"
        height="800"
        :src="src"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: "PDF_Renderer",
  props: ["src"]
};
</script>
