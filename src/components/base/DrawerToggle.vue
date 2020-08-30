<template>
  <div>   <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          
          @click="toggleDrawer"
        /></div>
</template>

<script>
export default {
  name: "DrawerToggleButton",
  data () {
    return {}
  },
  methods: {
    toggleDrawer() { this.$emit('toggle-drawer')}
  },
}
</script>
