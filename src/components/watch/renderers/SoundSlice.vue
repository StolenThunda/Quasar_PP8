<template>
  <div>
    {{
      `https://www.soundslice.com/slices/${src}/embed/?api=1&show_title=0&branding=2`
    }}
    <iframe
      id="ssembed"
      :src="
        `https://www.soundslice.com/scores/${src}/embed/?api=1&show_title=0&branding=2`
      "
      width="100%"
      height="800px"
      frameBorder="0"
    >
    </iframe>
  </div>
</template>

<script>
export default {
  name: "SoundSliceRenderer",
  props: ["src"]
};
</script>
