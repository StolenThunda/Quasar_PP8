<template>
  <q-chat-message
    v-bind="getUserProps"
    class="q-my-md"
    :id="'message_' + message.commentId"
    :label="message.label"
    :data-level="message.level"
    :data-parent="message.parentId"
    :hidden="hideChild"
    text-sanitize
  >
    <template v-slot:avatar v-if="!admin">
      <q-avatar
        class="q-message-avatar q-message-avatar--sent"
        icon="mdi-account"
      />
    </template>
    <template #default v-show="reply">
      <p>
        {{ message.text[0] }}
      </p>
      <p>
        <q-icon name="mdi-account" />
        <span class="q-pl-xs text-grey-4 text-caption">{{ message.user }}</span
        ><br />
        <q-icon name="mdi-clock-outline" />
        <span class="q-pl-xs text-warg text-caption">
          {{ message.relativeDate }}
        </span>
      </p>
      <div class="row justify-between q-my-sm text-capitalize text-weight-bolder">
        <q-btn
          label="Reply"
          v-bind="replyBtnProps"
          @click="reply = !reply"
          :color="!admin ? 'grey-9' : 'blue-7'"
          class=""
        />
        <q-btn
          v-show="hasChildren"
          v-bind="replyBtnProps"
          :color="!showReplies ? 'secondary' : 'primary'"
          :title="showReplies ? 'Close Replies' : 'View Replies'"
          @click="showReplies = !showReplies"
        >
          <q-icon name="mdi-forum" />
          <q-icon name="mdi-close" v-show="showReplies" />
        </q-btn>
      </div>
      <div v-show="reply">
        <hr />
        <add-comment :ask="reply" :id="message.commentId" />
      </div>
    </template>
  </q-chat-message>
</template>

<script>
export default {
  name: "UserAdminChatMessage",
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
    showReplies: true
  }),
  mounted() {
    const evtReply = `toggle-ask-reply_${this.message.commentId}`;
    // console.log("evt", evtReply);
    this.$root.$on(evtReply, this.toggleReply);
    this.$root.$on("submit-comment", this.submitComment);
  },
  watch: {
    showReplies(val) {
      console.log("show", val, this.message.children.length);
      this.toggleChildren(val);
    }
  },
  computed: {
    hideChild() {
      // debugger;
      const ret = this.message.level !== 0 ? !this.showReplies : false;
      return ret;
    },
    hasChildren() {
      return this.message.children.length > 0;
    },
    childIDs() {
      return this.message.children.map(function(cmt) {
        return cmt.commentId;
      });
    },
    getUserProps() {
      // debugger;
      return this.message.level > 0 && !this.admin
        ? {
            "bg-color": "grey-9",
            class: "text-italic text-grey-8 text-weight-lighter"
          }
        : this.admin
        ? {
            "bg-color": "grey-9",
            "text-color": "grey-6",
            class: "text-weight-bold text-italic",
            avatar: "https://texasbluesalley.com/TXBA-Icon-152.png"
          }
        : {
            "bg-color": "grey-14",
            "text-color": "white",
            class: "text-weight-light",
            sent: true
          };
    },
    replyBtnProps: () => ({
      dense: true,
      class: "q-px-sm",
      size: "xs",
      rounded: true
    })
  },
  methods: {
    toggleReply() {
      this.reply = !this.reply;
    },
    toggleChildren(val) {
      if (this.childIDs.length > 0) {
          const elName = `div[data-parent="${this.message.commentId}"]`;
          const children = document.querySelectorAll(elName)
          children.forEach(element => {
          element.style.display = val
            ? "block"
            : "none";
        });
      }
    },
    submitComment(str) {
      this.reply = !this.reply;
      this.$root.$emit("submit-comment", this.comment);
    }
  }
};
</script>
