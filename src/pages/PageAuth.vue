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
    >
      <q-carousel-slide
        :name="1"
        img-src="https://cdn.texasbluesalley.com/styles/TXBALogo.svg"
      />
      <q-carousel-slide
        :name="2"
        img-src="https://cdn.texasbluesalley.com/misc/locals-page/AllCourses-1600px.jpg"
      />
      <q-carousel-slide
        :name="3"
        img-src="https://txba-media.s3.amazonaws.com/woodshed/course-type-images/SRV-800.jpg"
      />
      <q-carousel-slide
        :name="4"
        img-src="https://txba-media.s3.amazonaws.com/woodshed/course-type-images/Influences-800.jpg"
      />
    <!-- <template v-slot:control>
        <q-carousel-control
          class="absolute-center"
        >
         
        </q-carousel-control>
      </template> -->
    </q-carousel>
  </q-page>
</template>

<script>

export default {
  name: "Auth",
  data: () => ({
    fullscreen: false,
    stars: 3,
    slide: 1,
    autoplay: true,
  }),
  // components: { LoginRegister }
};
</script>


