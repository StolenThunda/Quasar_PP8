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
      <!-- :hidden="message.level !== 0" -->
      <template v-slot:avatar v-if="!admin">
        <q-avatar
          class="q-message-avatar q-message-avatar--sent"
          icon="mdi-account"
        />
      </template>
      <template #default v-show="reply">
        <p :class="message.parentId > 0 ? 'text-grey-4' : 'white'">{{ message.text[0] }}</p>
        <p>
          <q-icon name="mdi-account" />
          <span class="text-grey-4 text-caption">{{ message.user }}</span
          >,
          <q-icon name="mdi-clock-outline" />
          <span class="text-secondary text-caption">{{ message.relativeDate }}</span>
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
            rounded
            v-show="hasChildren"
            v-bind="replyBtnProps"
            :color="!showReplies ? 'secondary' : 'primary'"
            @click="showReplies = !showReplies"
            :title="showReplies ? 'Close Replies' : 'View Replies'"
          >
            <q-icon name="mdi-close" v-show="showReplies" />
            <q-icon name="mdi-forum" v-show="!showReplies" />
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
    showReplies: true
  }),
  mounted() {
    // this.$root.$on("toggle-ask", this.reply = !this.reply);
    this.$root.$on("submit-comment", this.submitComment);
  },
  watch: {
    showReplies(val){
      // console.log('show', val,  this.message.children.length)
      this.toggleChildren(val)
    }
  },
  computed: {
    hasChildren() { return this.message.children.length > 0 },
    childIDs() { return this.message.children.map(function(cmt) { return cmt.commentId })},
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
            class: "text-weight-medium text-italic",
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
    toggleChildren(val){
      if (this.childIDs.length > 0 ) {
        this.childIDs.forEach(elID => {
          document.getElementById(elID).style.display = val ? 'block' : 'none'
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
