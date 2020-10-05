<template>
  <div class="row no-wrap q-pa-md" v-on="$listeners">
    <div class="column">
      <div class="text-overline q-mb-md">Settings</div>
      <q-toggle
        v-model="truncate"
        label="Truncate Labels"
        checked-icon="check"
        color="secondary"
        unchecked-icon="clear"
      />
      <q-toggle
        v-model="filtered"
        label="Filter Labels"
        checked-icon="check"
        color="secondary"
        unchecked-icon="clear"
      />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {truncate: false, filtered: false}
  },
  watch: {
    truncate: function () {
      this.$root.$emit('toggle-truncate')
    },
    filtered: function () {
      this.$root.$emit('toggle-filtered')
    }
  }
}
</script>
