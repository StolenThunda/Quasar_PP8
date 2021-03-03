<template>
<q-item
        clickable
        v-ripple
        active-class="text-orange"
        :id="getItemID(loop, i)"
        :key="getItemID(loop,i)"
        @click="toggleActive(loop, i)"
        :active="active(loop)"
      >
  <q-item-section avatar>
          <q-icon name="mdi-autorenew" />
        </q-item-section>
        <q-item-section class="text-center">
          <q-item-label>
            {{ loop[0] }}
          </q-item-label>
        </q-item-section>
        <q-item-section side avatar>
          <q-icon
            name="mdi-plus-circle"
            v-show="!active(loop)"
          />
          <q-icon
            name="mdi-check-circle"
            v-show="active(loop)"
          />
        </q-item-section>
      </q-item>
</template>

<script>
import { loop_funcs } from "../../../../mixins/loop_funcs.js"
  export default {
    props: ['loop'],
 mixins: [ loop_funcs ],
    
  }
</script>

<style lang="scss" scoped>

</style>