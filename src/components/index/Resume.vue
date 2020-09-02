<template>
  <q-card color="grey" class="container q-ma-lg" bordered>
    <q-card-section>
      <center>
        <q-btn label="Resume" icon="play_circle_outlined" color="secondary" />
      </center>
      <center class="q-pa-md">
        <span class="text-weight-bold text-subtitle2">{{ title }} </span>
      </center>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  props: {
    course: String,
    title: {
      type: String,
      default: "Albert’s Influence: Rockin Blues: Lesson 2 - Demonstration"
    }
  }
};
</script>

<style lang="stylus" scoped>
.container
   border: 1px solid #555
   background-color: rgba(84, 84, 84, 0.44)
</style>
