<template>
  <div class="q-mt-sm">
    <q-banner v-model="activeFilters">
      <span v-for="(val, key) in activeFilters" :key="key + componentKey">
        <span
          v-if="val.length > 1"
        >
          <q-fab
            color="secondary"
            class="text-capitalize"
            direction="down"
            :label="entitle(key)" 
            label-position="left" @click="morphContent1"
          >
          <!-- <q-badge color="orange" floating>{{ val.length }}
           </q-badge> -->
            <div :ref="'morphedElement1-' + key" v-bind="props1">
            <q-chip
              v-for="chip in val"
              :key="chip.sync + componentKey"
              @remove="deleteFilter(chip)"
              removable
            >
              {{ chip.text }}
            </q-chip>
          </div>
          </q-fab>
         
        </span>
        <span
          v-else
          :set="(chip = val[0])"
        >
          <q-chip color="secondary" removable @remove="deleteFilter(chip)">
            {{ chip.text }}
            <q-badge
              class="text-capitalize"
              align="bottom"
              color="orange"
              transparent
              floating
              >{{ entitle(key) }}</q-badge
            >
          </q-chip>
        </span>
      </span>
    </q-banner>
    <!-- <q-banner v-else-if="search && !currentFilters">Showing: ALL</q-banner> -->
  </div>
</template>

<script>
import { morph } from "quasar";
import { createNamespacedHelpers } from "vuex";
import { BrowserFilterSectionList } from "src/middleware/ProPlayerBrowser";
const { mapActions, mapGetters, mapState } = createNamespacedHelpers("browser");
export default {
  name: "CurrentSearchBanner",
  data: () => ({ filters: null, componentKey: 0, toggle1: false }),
  computed: {
    props1() {
      return this.toggle1 === true
        ? {
            class: "q-ml-sm q-pa-md bg-orange text-white rounded-borders",
            style: "font-size: 24px"
          }
        : {
            class: "q-ml-xl q-px-xl q-py-lg bg-blue text-white",
            style: "border-radius:  25px;"
          };
    },
    ...mapState(["searching", "activeFilters"])
  },
  watch: {
    activeFilters() {
      this.forceUpdate();
    }
  },
  methods: {
    entitle(str) {
      return str.replace("-", " ");
    },
    morphContent1() {
      const onToggle = () => {
        this.toggle1 = this.toggle1 !== true;
      };

      if (this.cancel1 === void 0 || this.cancel1() === false) {
        this.cancel1 = morph({
          from: this.$refs.morphedElement1,
          onToggle,
          duration: 500,
          tween: true,
          onEnd: end => {
            end === "from" && onToggle();
          }
        });
      }
    },
    forceUpdate() {
      this.componentKey += 1;
    },
    deleteFilter(data) {
      ``;
      return this.removeFilter(data);
    },
    ...mapActions(["removeFilter"])
  }
};
</script>

<style scoped>
.q-fab__actions > div {
  z-index: 1000 !important;
}
</style>