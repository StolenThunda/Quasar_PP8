<template>
  <v-card class="ma-5" outlined v-if="currentCourse" v-model="currentCourse">
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4" v-if="currentCourse">
          <span v-html="currentCourse.packageDescription"></span>
        </div>
        <v-list-item-title class="headline mb-1" v-if="currentCourse">
          <span v-html="currentCourse.packageTitle"></span>
        </v-list-item-title>
        <v-list-item-subtitle
          v-html="currentCourse.packageOverview"
        ></v-list-item-subtitle>
        <v-btn class="ma-4" @click="expand = !expand">Expand Details</v-btn>
        <v-expand-transition>
          <v-card v-show="expand" class="mx-auto">
            <pre>
              {{ currentCourse }}
            </pre>
            <v-card-actions></v-card-actions>
          </v-card>
        </v-expand-transition>
      </v-list-item-content>

      <v-list-item-avatar tile size="200">
        <v-img :src="currentCourse.packageImage" contain></v-img>
      </v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn @click="test">
        Console Log Tree View
      </v-btn>
    </v-card-actions>
  </v-card>
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
