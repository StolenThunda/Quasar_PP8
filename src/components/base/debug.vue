<template>
  <div><!-- debug --></div>
</template>

<script>
export default {
  name: "Debugger",
  props: ["item"],
  created: function() {
    console.log("debug", this.item);
    debugger;
  }
};
</script>
