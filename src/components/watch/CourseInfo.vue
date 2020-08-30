<template>
  <div>
      <q-list v-model="currentCourse" v-if="currentCourse">
        <!-- <q-item>
          <q-item-section>
            <span class="text-body1" v-html="currentCourse.packageOverview"></span>
          </q-item-section>
        </q-item> -->
        <q-item>
          <q-item-section>
            <div class="overline mb-4" v-if="currentCourse">
              <span v-html="currentCourse.packageDescription"></span>
            </div>
          </q-item-section>
        </q-item>
        <q-item>
           <q-item-section>
            <pre>
              {{ currentCourse }}
            </pre>
          </q-item-section>
        </q-item>
      </q-list>
   
   </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("watch");
export default {
  name: "CourseInfo",
  data: () => ({
    expand: false,
    player: null
  }),
  computed: {
    ...mapState(["currentCourse"])
  },
  methods: {
    test() {
      console.log("CurrCourse", this.currentCourse);
    }
  }
};
</script>
