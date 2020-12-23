<template>
    <!-- v-if="loggedIn" -->
  <q-btn
    v-bind="authBtnProps"
    @click.prevent="login"
    glossy
    push
    ripple
    icon="account_circle"
  >
    <!-- <q-avatar size="42px" v-if="loggedIn"> -->
    <!-- <img :src="this.$auth.user.picture" /> -->
    <!-- </q-avatar> -->
    <q-menu>
      <div class="row q-pa-lg no-wrap ">
        <div class="column ">
          <div class="text-h6 q-mb-md">Settings</div>
          <!-- <q-btn icon="mdi-account-details" label="Account" to="/profile" /> -->
          <tool-list />
        </div>

        <q-separator vertical inset class="q-mx-lg" />

        <div class="column items-center">
          <!-- <q-avatar size="72px">
            <img :src="this.$auth.user.picture" />
          </q-avatar> -->

          <div class="text-center text-subtitle1 q-mt-md q-mb-xs">
            {{ userEmail }}
          </div>

          <q-btn
            v-if="loggedIn"
            icon="fa fa-power-off"
            color="primary"
            label="Logout"
            push
          @click.prevent="logout_user"
          />
        </div>
      </div>
    </q-menu>
  </q-btn>
</template>

<script>
import { firebaseAuth } from "boot/firebase";
import { mapActions, mapState } from "vuex";
export default {
  name: "AuthButton",
  components: {
    ToolList: () => import("components/base/DefaultToolList")
  },
  computed: {
    authBtnProps() {
      const props = !this.loggedIn
        ? {
            "icon-right": "fas fa-sign-in-alt",
            label: "Login"
          }
        : {
            round: true
          };
      return Object.assign(
        {
          flat: true,
          dense: true
        },
        props
      );
    },
    round() {
      return this.loggedIn;
    },
    userEmail() {
      return firebaseAuth.currenUser?.email ?? "Default@email.com";
    },
    ...mapState("auth", ["loggedIn"])
  },
  methods: {
    ...mapActions("auth", ["login_user", "logout_user"])
  }
};
</script>
