import { LocalStorage } from "quasar";
import store from "src/store";
// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    const key = "loggedIn";
    const now = new Date();
    let loggedIn = LocalStorage.getItem(key);
    // console.log('logged: ', loggedIn);
    // // test to see if login expired
    if (loggedIn) {
      if (now.getTime() < loggedIn?.expiry) {
        next()
      } else {
        console.log("Expired login: sending to auth page");
        store.commit("auth/SET_LOGGED_IN", false);
        LocalStorage.remove(key);
        next("/auth");
      }
    } else {
      if ( to.path !== "/auth" ) {
        next( "/auth" );
      } else {
        next()
      }
    }
  });
};
