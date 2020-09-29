<template>
  <div class="q-mt-sm">
    <search-indicator />
  </div>
</template>

<script>
// import Vue from 'vue'
export default {
  name: "CurrentSearchBanner",
  components: { SearchIndicator: () => import("components/browse/SearchIndicator")},
};
</script>
