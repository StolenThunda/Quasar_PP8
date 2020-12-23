<template>
  <div>
    <q-list bordered separator dense>
      <q-item
        clickable
        v-ripple
        active-class="text-orange"
        v-for="(item, i) in Object.entries(loopArray)"
        :set="loop = loopArray[i]"
        :id="getItemID(loop, i)"
        :key="getItemID(loop,i)"
        @click="toggleActive(loop, i)"
        :active="active(loop)"
      >
        <!-- <pre> {{ loop }} </pre> -->
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
            v-show="!activeList[getActiveItemName(loop)]"
          />
          <q-icon
            name="mdi-check-circle"
            v-show="activeList[getActiveItemName(loop)]"
          />
        </q-item-section>
      </q-item>
      <!-- </template> -->
    </q-list>
    <!-- <p v-else>{{ altMessage }}</p> -->
  </div>
</template>

<script>
import { loop_funcs } from "../../../../mixins/loop_funcs.js"
import Vue from "vue";
export default {
  name: "LoopList",
  props: {
    loopArray: {
      type: Array,
      default: () => []
    },
    altMessage: {
      type: String,
      default: "No Alt Message or Data"
    },
    collectionID: {
      type: Number,
      default: () => 0
    }
  },
  data: () => ({ activeList: {}, componentKey: 0 }),
 mixins: [ loop_funcs ]
};
</script>
