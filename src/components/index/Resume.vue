<template>
  <div class="column">
      <q-btn :label="title" icon="play_circle_outlined" color="primary" size='md' push outline rounded />
    <div>
      <span class="text-body1"> </span>
    </div>
  </div>
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

<style>
container {
  background-color: rgba(33, 33, 33, 0.7) !important;
}
</style>
