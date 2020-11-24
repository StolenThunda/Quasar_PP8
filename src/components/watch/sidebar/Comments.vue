<template>
  <div>
    <h6>Comments</h6>
    <span v-html="info"></span>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data: () => ({ info: null }),
  mounted() {
    this.loadComments();
  },
  computed: {},
  methods: {
    async loadComments() {
      this.info = await this.fetchComments(this.$route.params.packageID);
    },
    ...mapActions("watch", ["fetchComments"])
  }
};
</script>

<style lang="scss" scoped></style>
