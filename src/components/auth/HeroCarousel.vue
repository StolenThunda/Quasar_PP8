<template>
  <q-page padding>
    <q-carousel
      v-model="slide"
      height="85vh"
      transition-prev="fade"
      transition-next="fade"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
      infinite
      autoplay
      animated
      arrows
    >
      <q-carousel-slide
        v-for="(img, i) in images"
        :key="i"
        :name="i"
        class="column no-wrap"
      >
        <div
          class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
        >
          <q-img
            class="rounded-borders full-height"
            :src="img.src"
            :ratio="img.ratio"
            :contain="img.contain"
          />
        </div>
      </q-carousel-slide>
    </q-carousel>
  </q-page>
</template>

<script>
export default {
  name: "TXBA_Hero",
  data: () => ({
    fullscreen: false,
    slide: 1,
    autoplay: true,
    images: [
      {
        src: "https://cdn.texasbluesalley.com/styles/TXBALogo.svg",
        contain: true
      },
      {
        src:
          "https://cdn.texasbluesalley.com/misc/locals-page/AllCourses-1600px.jpg"
      },
      {
        src:
          "https://txba-media.s3.amazonaws.com/woodshed/course-type-images/SRV-800.jpg"
      },
      {
        src:
          "https://txba-media.s3.amazonaws.com/woodshed/course-type-images/Influences-800.jpg"
      },
      {
        src:
          "https://cdn.texasbluesalley.com/styles/TXBA-Theme/banners/TXBA-Store-Banner.jpg"
      },
      {
        src:
          "https://cdn.texasbluesalley.com/products/3840/dsc00025__medium.jpg",
        contain: true
      },
      {
        src:
          "https://cdn.texasbluesalley.com/styles/TXBA-Theme/banners/TXBA-Home-Banner.jpg",
        contain: true
      }
    ]
  })
};
</script>
