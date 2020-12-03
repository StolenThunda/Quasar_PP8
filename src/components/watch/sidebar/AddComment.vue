<template>
  <q-card v-show="ask" :id="replyId">
    <q-card-section>
      <q-input
        filled
        standout
        bottom-slots
        counter
        maxlength="500"
        rows="4"
        autofocus
        cols="70"
        label="Comment/Question"
        v-model="comment"
      >
        <template v-slot:hint>
          Comment/Question
        </template>
      </q-input>
    </q-card-section>
    <q-card-actions class="flex flex-center">
      <q-btn color="negative" label="Cancel" @click="toggleAsk" />
      <q-btn color="secondary" label="Submit" @click="submitComment" />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  props: {
    ask: {
      type: Boolean,
      default: () => false
    },
    id: [String, Number]
  },
  data: () => ({ comment: "", replyId: null }),
  mounted() {
    this.replyId = "reply_" + this.id;
  },
  methods: {
    toggleAsk() {
      const strEmit = `toggle-ask-${this.replyId}`;
      console.log("emit", strEmit);
      this.$root.$emit(strEmit);
    },
    submitComment() {
      this.$root.$emit("submit-comment", this.comment);
    }
  }
};
</script>

<style lang="scss" scoped></style>
