import { Notify, QSpinnerGears } from "quasar";
import { firebaseAuth } from "boot/firebase";
import { Loading, LocalStorage } from "quasar";

export default {
  namespaced: true,
  state: {
    loggedIn: false
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.loggedIn = value;
    }
  },
  actions: {
    register_user({ dispatch }, payload) {
      console.log("register", payload);

      firebaseAuth
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(userCredential => {
          // Signed in
          var user = userCredential.user;
          console.log("Registration Successful", user);
          // ...
          dispatch("login_user", payload);
        })
        .catch(error => {
          Notify.create({
            type: "negative",
            caption: error.code,
            message: error.message
          });
          console.error(error.code, error.message);
        });
    },
    login_user({ commit, dispatch }, payload) {
      const dismiss = Notify.create({
        spinner: QSpinnerGears,
        message: "Working..."
      });
      firebaseAuth
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(userCredential => {
          // Signed in
          var user = userCredential.user;
          // console.log("Login Successful", user);
          dispatch("setWithExpiry", "loggedIn");
          dismiss();
          this.$router.replace("/").catch(err => {});
        })
        .catch(error => {
          commit("SET_LOGGED_IN", false);
          dismiss();
          Notify.create({
            type: "negative",
            caption: error.code,
            message: error.message
          });
          console.error(error.code, error.message);
        });
    },
    logout_user({ commit }) {
      console.log("logout");
      firebaseAuth.signOut().then(() => {
        commit("SET_LOGGED_IN", false);
        this.$router.push("/auth").catch(err => {});
        LocalStorage.remove("loggedIn");
      });
    },
    setWithExpiry(ctx, key) {
      const now = new Date();
      const oneday = 60 * 60 * 24 * 1000; //(milliseconds)
      const item = {
        expiry: now.getTime() + oneday
      };
      LocalStorage.set(key, item);
    },
    handleAuthStateChange({ commit }, value) {
      firebaseAuth.onAuthStateChanged(user => {
        Loading.hide();
        if (user) {
          // console.log('logged in', user)
          commit("SET_LOGGED_IN", true);
          this.$router.push("/").catch(err => {});
        } else {
          commit("SET_LOGGED_IN", false);
          LocalStorage.remove("loggedIn");
          this.$router.replace("/auth").catch(err => {});
        }
        // console.log('auth state change', typeof user === Object ? 'logged in': 'logged out');
      });
    }
  },
  getters: {}
};
