<script>
export default {
  name: "get-json",
  props: ["endpoint"],
  render() {
    return this.$scopedSlots.default({
      response: this.response
    });
  },
  created() {
    axios
      .get(this.endpoint)
      .then(response => {
        this.response = response.data;
      })
      .catch(error => {
        console.error("Error", error);
      });
  },
  data: () => ({
    response: []
  })
};
</script>
