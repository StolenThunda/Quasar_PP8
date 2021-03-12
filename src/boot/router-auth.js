import { LocalStorage } from "quasar";
// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default ({router}) => {
  router.beforeEach((to, from, next) => {
    let loggedIn = LocalStorage.getItem('loggedIn')
    if (!loggedIn && to.path != '/auth'){
      next('/auth')
    }else{
      next()
    }
  })
}
