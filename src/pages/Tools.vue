<template>
  <iframe :src='getTool'></iframe>
</template>

<script>
export default {
  name: 'Tools',
  data: () => ({
    baseUrl: 'https://texasbluesalley.com'
  }),
  computed: {
    getTool() { 
      const src = this.baseUrl + this.$route.meta.src
      console.log('src', src)
      return src }
  }
}
</script>
