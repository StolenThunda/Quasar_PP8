import { LocalStorage } from "quasar";
// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    const key = "loggedIn";
    let loggedIn = LocalStorage.getItem(key);
    if (!loggedIn && to.path !== '/auth') {
      next("/auth");
    } else {
      // const now = new Date();
      // test to see if login expired
      // if ( loggedIn ) {
      //   // compare the expiry time of the item with the current time
      //   if (now.getTime() > loggedIn.expiry ) {
      //     console.log("Login expired");
      //     // If the item is expired, delete the item from storage
      //     LocalStorage.remove(key);
      //     next("/auth");
      //   } else {
          next();
      //   }
      // }
    }
  });
};
