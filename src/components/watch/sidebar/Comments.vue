<template>
  <div class="fit">
    <div class="bg-grey-7 row no-wrap">
      <q-toolbar-title class="q-pl-sm">Questions</q-toolbar-title>
      <q-space />
      <q-btn
        dense
        size="sm"
        icon="mdi-comment-processing"
        label="Ask"
        :color="ask ? 'primary' : 'secondary'"
        :disable="ask"
        @click="ask = !ask"
      />
    </div>
    <div class="bg-grey-9 row no-wrap">
      <q-checkbox
        v-model="notify"
        label="Notify"
        class="q-mr-lg q-ml-none q-pr-md"
      />
      <q-space />
      <q-btn-toggle
        v-model="view"
        toggle-color="secondary"
        :options="[
          { label: 'All', value: 'all' },
          { label: 'Mine', value: 'mine' }
        ]"
      />
      <!-- @click="getView" -->
    </div>
    <add-comment :ask="ask" :id="id" />
    <div class="flex flex-center">
      <div v-if="user" class="text-center text-weight-light q-pb-lg">
        <i>
          Commenting as
          <span class="text-weight-bolder">{{ user }}</span></i
        >
      </div>
      <div v-else>
        NOT LOGGED IN
      </div>
      <div v-if="!list && !ask">
        <p>Be the first to ask a question about this course or video.</p>
      </div>
      <q-btn
        label="Ask a Question"
        color="secondary"
        @click.self="ask = !ask"
        icon="mdi-comment-processing"
        v-show="!ask && !list"
      />
    </div>
    <q-scroll-area v-if="list" style="height: 75vh;">
      <template v-for="(dateGroup, i) in Object.keys(list).reverse()">
        <q-expansion-item
          default-opened
          expand-separator
          switch-toggle-side
          :group="dateGroup"
          :label="dateGroup"
          class="menu-list"
          :key="i"
        >
        <template v-for="comment in list[dateGroup]">
          <user-admin-chat 
            :admin="isAdmin(comment.user)"
            :message="comment"
            :key="comment.commentId + '_' + i"
          />
          <user-admin-chat
            v-for="childComment in comment.children"
            :key="childComment.commentId"
            :message="childComment"
            :admin="isAdmin(childComment.user)"
          />
        </template>
        </q-expansion-item>
      </template>
    
    </q-scroll-area>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import UserAdminChat from "./User_AdminChat.vue";
import AddComment from "./AddComment";
export default {
  name: "Comments",
  data: () => ({
    id: "000",
    hideDay: true,
    user: null,
    list: null,
    notify: false,
    view: "all",
    ask: false,
    comment: ""
  }),
  created() {
    this.$root.$on(`toggle-ask-reply_${this.id}`, this.toggleAsk);
    this.$root.$on("submit-comment", this.submitComment);
  },
  mounted() {
    this.loadComments();
  },
  components: {
    addComment: () => import("./AddComment"),
    UserAdminChat
  },
  methods: {
    toggleReplies(parent) {
      console.log(parent);
    },
    isAdmin(str) {
      return str.indexOf("Texas Blues Alley") > -1;
    },
    toggleAsk() {
      this.ask = !this.ask;
    },
    async loadComments(view) {
      const { notice, list } = await this.fetchComments(
        this.$route.params.packageID,
        view
      );
      // console.log("info", info);
      this.list = list;
      // this.list = this.sortedCommentsByDate(info.list, 'day');
      this.user = notice;
    },
    submitComment(comment) {
      this.comment = comment;
      console.log(this.ask, this.comment);
      this.ask = !this.ask;
    },
    ...mapActions("watch", ["fetchComments"])
  }
};
</script>

<style scoped>
.section-heading {
  background-color: #bb8c59;
  color: #000;
}
</style>
