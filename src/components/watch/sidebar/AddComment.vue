<template>
  <section v-show="ask">
    <q-card-section>
      <q-input
        filled
        standout
        bottom-slots
        counter
        maxlength="500"
        rows="4" autofocus
        cols="70"
        label="Comment/Question"
        v-model="comment"
      >
        <!-- <template v-slot:before>
          <q-icon name="comment" />
        </template> -->
        <template v-slot:hint>
          Comment/Question
        </template>
      </q-input>
    </q-card-section>
    <q-card-actions class="flex flex-center">
      <q-btn color="negative" label="Cancel" @click="toggleAsk" />
      <q-btn color="secondary" label="Submit" @click="submitComment" />
    </q-card-actions>
  </section>
</template>

<script>
export default {
  props: {
    ask: Boolean,
    default: () => false
  },
  data: () => ({ comment: "" }),
  methods: {
    toggleAsk() {
      this.$root.$emit("toggle-ask");
    },
    submitComment() {
      this.$root.$emit("submit-comment", this.comment);
    }
  }
};
</script>

<style lang="scss" scoped></style>
