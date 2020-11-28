 <template>
  <div>
    <q-chat-message
      :label="message.label"
      :id="message.commentId"
      :data-level="message.level"
      :data-parent="message.parentId"
      text-sanitize
      v-bind="getUserProps"
    >
      <template v-slot:avatar v-if="!admin">
        <q-avatar
          class="q-message-avatar q-message-avatar--sent"
          icon="mdi-account"
        />
      </template>
      <template #default v-show="reply">
        <p>{{ message.text[0] }}</p>
        <p>
          <q-icon name="mdi-account" />
          <span class="author text-weight-bolder">{{ message.user }}</span
          >,
          <q-icon name="mdi-clock-outline" />
          <span class="author text-secondary">{{ message.relativeDate }}</span>
        </p>
        <div class="row justify-between q-py-md">
          <q-btn
            label="Reply"
            rounded
            v-bind="replyBtnProps"
            @click="reply = !reply"
            :color="!admin ? 'grey-5' : 'blue-7'"
          />
          <q-btn
            v-bind="replyBtnProps"
            rounded
            title="View Replies"
            :color="!showReplies ? 'secondary' : 'primary'"
            @click="showReplies = !showReplies"
          >
            <q-icon name="mdi-forum" />
            <q-icon name="mdi-close" v-if="reply" />
          </q-btn>
        </div>
        <div v-show="reply">
          <hr />
          <add-comment :ask="reply" />
        </div>
      </template>
    </q-chat-message>
  </div>
</template>

<script>
// import AddComment from "./AddComment.vue";
export default {
  name: "UserAdminChat",
  props: {
    message: Object,
    admin: {
      type: Boolean,
      default: false
    }
  },
  components: {
    AddComment: () => import("./AddComment")
  },
  data: () => ({
    reply: false,
    showReplies: false
  }),
  created() {
    // this.$root.$on("toggle-ask", this.reply = !this.reply);
    this.$root.$on("submit-comment", this.submitComment);
  },
  computed: {
    getUserProps() {
      // debugger;
      return this.message.level > 0 && !this.admin
        ? {
            "bg-color": "grey-9",
            "text-color": "white",
            class: "text-italic text-grey-8 text-weight-light"
          }
        : this.admin
        ? {
            "bg-color": "grey-9",
            "text-color": "white",
            class: "text-weight-bold",
            avatar: "https://texasbluesalley.com/TXBA-Icon-152.png"
          }
        : {
            "bg-color": "grey-14",
            "text-color": "white",
            sent: true
          };
    },
    replyBtnProps: () => ({
      dense: true,
      class: "col-3"
    })
  },
  methods: {
    submitComment(str) {
      this.reply = !this.reply;
      this.$root.$emit("submit-comment", this.comment);
    }
  }
};
</script>
