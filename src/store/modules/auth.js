import { Notify, QSpinnerGears} from "quasar";
import { firebaseAuth } from "boot/firebase";
import { Loading, LocalStorage } from "quasar";

export default {
  namespaced: true,
  state: {
   loggedIn: false
  },
  mutations: {
   SET_LOGGED_IN(state, value) {
  state.loggedIn = value
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
      })
      console.error(error.code, error.message);
    });
},
login_user({ commit }, payload) {
  const dismiss = Notify.create( {
    spinner: QSpinnerGears,
    message: 'Working...',
  } )
  firebaseAuth
    .signInWithEmailAndPassword(payload.email, payload.password)
    .then(userCredential => {
      // Signed in
      var user = userCredential.user;
      // console.log("Login Successful", user);
      dismiss()
      this.$router.replace("/").catch(err => {});
    })
    .catch(error => {
      commit("SET_LOGGED_IN", false);
      dismiss()
      Notify.create( {
        type: "negative",
        caption: error.code,
        message: error.message
      } )
      console.error( error.code, error.message );
    });
},
logout_user({ commit }) {
  console.log("logout");
  firebaseAuth.signOut().then(() => {
    commit("SET_LOGGED_IN", false);
    this.$router.push("/auth").catch(err => {});
  });
},
 handleAuthStateChange({ commit, dispatch }, value) {
  firebaseAuth.onAuthStateChanged(user => {
    Loading.hide();
    if (user) {
      // console.log('logged in')
      commit("SET_LOGGED_IN", true);
      LocalStorage.set("loggedIn", true);
      this.$router.push("/").catch(err => {});
      // dispatch("Tasks/fbReadData", null, { root: true });
    } else {
      // console.log('logged out')
      commit("SET_LOGGED_IN", false);
      LocalStorage.set("loggedIn", false);
      this.$router.replace("/auth").catch(err => {});
    }
    // console.log('auth state change', typeof user === Object ? 'logged in': 'logged out');
  })
  }
},
  getters: {
    
  }
}