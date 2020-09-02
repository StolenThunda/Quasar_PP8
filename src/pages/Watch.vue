<template>
<div>
  <!-- <q-card v-model="currentSetup">
  
  </q-card> -->
   <q-card class="my-card">
      <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
        <div class="absolute-bottom">
          <div class="text-h6">Our Changing Planet</div>
          <div class="text-subtitle2">by John Doe</div>
        </div>
      </q-img>
<!-- <q-card-section><pre>{{currentCourse}}</pre></q-card-section> -->
<q-card-section :set="(s = getCourseInfo)">
  <p>{{s.image}}</p>
  <p>{{s.title}}</p> 
  <p>{{s.overview}}</p> 
  <p>{{s.description}}</p> 
</q-card-section>
><pre>{{currentCourse}}</pre></q-card-section>
      <!-- <q-card-actions>
        <q-btn flat>Action 1</q-btn>
        <q-btn flat>Action 2</q-btn>
      </q-card-actions> -->
    </q-card>
</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'PackageInfo',
  computed: {
    getCourseInfo() {
      return {
        title : this.currentCourse.packageTitle,
        image : this.currentCourse.packageImage,
        overview : this.currentCourse.packageOverview,
        description : this.currentCourse.packageDescription,
        
      }
    },
    ...mapState('watch', ['currentCourse'])
  },
}
</script>
