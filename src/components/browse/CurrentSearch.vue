<template>
  <q-toolbar v-if="searching" class="flex flex-center text-white">
    Filters:
    <span v-for="(val, key) in activeFilters" :key="key + componentKey">
      <span v-if="val.length > 1">
        <q-btn rounded color="secondary" :label="entitle(key)">
          <q-badge floating transparent color="accent" class="shadow-5">
            {{ val.length }}
          </q-badge>
          <q-menu
            transition-show="rotate"
            transition-hide="rotate"
            anchor="bottom middle"
            self="top middle"
            fit
          >
            <q-list style="min-width: 100px">
              <q-item v-for="chip in val" :key="chip.sync + componentKey">
                <q-chip @remove="deleteFilter(chip)" removable outline>
                  {{ chip.text }}
                </q-chip>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </span>
      <span v-else class="text-capitalize" :set="(chip = val[0])">
        <q-chip color="secondary" removable @remove="deleteFilter(chip)">
          {{ chip.text }}
          <q-badge
            align="top"
            color="accent"
            transparent
            class="shadow-5"
            floating
            >{{ entitle(key) }}</q-badge
          >
        </q-chip>
      </span>
    </span>
  </q-toolbar>
</template>

<script>
import { morph, format } from "quasar";
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
            class: "q-ml-sm q-pa-md bg-accent text-white rounded-borders",
            style: "font-size: 24px"
          }
        : {
            class: "q-ml-xl q-px-xl q-py-lg bg-blue text-white",
            style:
              "border-radius:  25px; background-color: rgba(0, 153, 255, 0.85) !important;"
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
      return format.capitalize(str.replace("-", " "));
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
