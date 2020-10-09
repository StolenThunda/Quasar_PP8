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
      <q-btn
        label="Get Filter List"
        color="secondary"
        @click="showCurrentFilters"
        outline
      />
      <q-btn
        label="Form Data"
        color="secondary"
        @click="serializeForm"
        outline
      />
    </div>
  </div>
</template>

<script>
import { serialize } from "../../plugins/vanillaJS_Utilities";
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapState } = createNamespacedHelpers("browser");
export default {
  data() {
    return { truncate: false, filtered: false, fList: null };
  },
  watch: {
    truncate: function() {
      this.$root.$emit("toggle-truncate");
    },
    filtered: function() {
      this.$root.$emit("toggle-filtered");
    }
  },
  computed: {
    ...mapState(["activeFilters"])
  },
  methods: {
    showCurrentFilters() {
      const list = this.$store.getters["browser/getFilterList"];
      console.log("active filters", this.activeFilters);
      console.log("filterList", list);
      alert(JSON.stringify(list, null, 4));
      // alert(JSON.stringify(this.activeFilters,null,2))
    },
    serializeForm() {
      const form = document.querySelector("#filterForm");
      const formData = serialize(form)
      alert(formData)
    }
  }
};
</script>
