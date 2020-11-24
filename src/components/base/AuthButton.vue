<template>
  <q-btn
    v-bind="authBtnProps"
    @click.prevent="login"
    glossy
    push
    ripple
  >
    <q-avatar size="42px" v-if="this.$auth.isAuthenticated">
      <img :src="this.$auth.user.picture" />
    </q-avatar>
    <q-menu v-if="this.$auth.isAuthenticated">
      <div class="row q-pa-lg no-wrap ">
        <div class="column ">
          <div class="text-h6 q-mb-md">Settings</div>
          <q-btn icon="mdi-account-details" label="Account" to="/profile"  />
            <tool-list />
        </div>

        <q-separator vertical inset class="q-mx-lg" />

        <div class="column items-center">
          <q-avatar size="72px">
            <img :src="this.$auth.user.picture">
          </q-avatar>

          <div class="text-center text-subtitle1 q-mt-md q-mb-xs">{{ this.$auth.user.name }}</div>

          <q-btn
            icon="fa fa-power-off"
            color="primary"
            label="Logout"
            @click.prevent="logout"
            push
          />
        </div>
      </div>
    </q-menu>
  </q-btn>
</template>

<script>
export default {
  name: "AuthButton",
  components: {
    ToolList: () => import("components/base/DefaultToolList")
  },
  computed: {
    authBtnProps(){
      const props = !this.$auth.isAuthenticated && !this.$auth.loading
      ? {
        'icon-right': 'fas fa-sign-in-alt',
        label: 'Login',        
      }
      : {
        round: true
      }
      return Object.assign({
    flat: true,
    dense: true}, props);
    },
    round() {
      return this.$auth.isAuthenticated && !this.$auth.loading;
    },
    toggleLoginBtn() {
      return !this.$auth.isAuthenticated && !this.$auth.loading ? "Login" : "";
    },
    toggleIcon() {
      return !this.$auth.isAuthenticated && !this.$auth.loading
        ? "mdi-login"
        : '';
    },
    getImg() {
      // this.round = true
      return this.$auth.user?.picture || '';
    }
  },
  methods: {
    login() {
      // debugger;
      if (!this.$auth.isAuthenticated && !this.$auth.loading)
        this.$auth.loginWithRedirect();
    },
    logout() {
      // this.round = false
      this.$auth.logout({
        returnTo: window.location.origin
      });
    }
  }
};
</script>
