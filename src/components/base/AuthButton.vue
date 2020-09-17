<template>
  <q-btn :label="this.toggleLoginBtn" @click.prevent="this.login" round>
    <q-avatar size="42px">
      <img :src="this.$auth.user.picture" />
    </q-avatar>
    <q-menu>
      <div class="row no-wrap q-pa-md" v-if="this.$auth.isAuthenticated">
        <div class="column text-h6 q-mb-md">
          <q-btn icon="fa fa-user" label="Profile" to="/profile" />
          <tool-list />
          <q-btn
            icon="fa fa-power-off"
            label="Logout"
            @click.prevent="this.logout"
            push 
        <div class="column items-center">
          <q-avatar size="72px">
            <img :src="this.$auth.user.picture" />
          </q-avatar>

          <div class="text-subtitle1 q-mt-md q-mb-xs">
            {{ this.$auth.user.name }}
          </div>
        </div>
      </div>
      <div class="row no-wrap q-pa-md" v-else>
        <div class="column">Log in for Settings</div>
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
    toggleLoginBtn() {
      return !this.$auth.isAuthenticated && !this.$auth.loading ? "Login" : "";
    },
    toggleIcon() {
      return !this.$auth.isAuthenticated && !this.$auth.loading
        ? "fas fa-sign-in-alt"
        : "fa fa-user";
    }
  },
  methods: {
    login() {
      if (!this.$auth.isAuthenticated && !this.$auth.loading)
        this.$auth.loginWithRedirect();
    },
    logout() {
      // this.$auth.logout();
      this.$auth.logout({
        returnTo: window.location.origin
      });
      // this.$router.push("/");
    }
  }
};
</script>
