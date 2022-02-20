<template>
      <q-page class="
      fit
      row 
      flex 
      flex-center
      justify-around
      "
      >

     <q-btn
      icon="list"
        size="xl"
        to="/tools/fretboard"
        class="bg-primary q-pa-xl"
        exact
        stack
        glossy
        >Fretboard <br />Tool</q-btn>

      <q-btn
        title="Under Construction"
        size="xl"
        to="/tools/spider"
        class="bg-primary q-pa-xl"
        exact
        stack
        glossy
        disable
        icon="bug_report"
        >
        Spider <br />Tool
        </q-btn>

     <q-btn
        size="xl"
        icon="speed"
        class="bg-primary q-pa-xl"
        to="/tools/tuner"
        stack
        glossy
        exact>Chromatic <br />Tuner</q-btn>
    </q-page>
</template>

<script>
export default {
  name: 'Tool Index'
}
</script>

<style>

</style>