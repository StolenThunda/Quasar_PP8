import Vue from 'vue';
export default {
  namespaced: true,
  state: {
    favorites: [],
    notifications: null
  },
  mutations: {
    SET_FAVS(ctx, favs) {
      // console.log("SettingFAVS:", favs);
      if (favs) ctx.favorites = favs;
    },
    SET_NOTIFICATIONS(ctx, notes) {
      // console.log("SettingNotes:", notes);
      if (notes) ctx.notifications = notes;
    }
  },
  actions: {
    fetchFavoritesData(ctx) {
      return ctx.rootState.TXBA_UTILS.getFavs();
    },
    fetchNotificationData(ctx) {
      return ctx.rootState.TXBA_UTILS.getNotification();
    },
    async fetchFavorites(ctx) {
      await ctx
        .dispatch("fetchFavoritesData")
        .then(data => ctx.commit("SET_FAVS", data));
    },
    async fetchNotifications(ctx) {
      await ctx
        .dispatch("fetchNotificationData")
        .then(data => ctx.commit("SET_NOTIFICATIONS", data));
    },
    removeFavorite(ctx, id) {
      console.log( ctx.state.favorites )
      const courseIdx = ctx.state.favorites?.Courses.findIndex( x => x.id === id );
      if ( courseIdx > -1 ) {
        console.log(`Removing ID ${id} @ idx ${courseIdx} `);
        ctx.state.favorites.Courses.splice( courseIdx, 1 );
        Vue.set( ctx.state.favorites, "Courses", ...ctx.state.favorites.Courses );
        return true;
      }
      const importedIdx = ctx.state.favorites?.Imported.findIndex( x => x.id === id );
      if ( importedIdx > -1 ) {
        console.log( `Removing ID ${id} @ idx ${importedIdx} ` );
        ctx.state.favorites.Imported.splice( importedIdx, 1 );
        Vue.set( ctx.state.favorites.Imported, "Imported", ...ctx.state.favorites.Imported );
        return true
      }
      return false;
    },
    initStore: ctx => {
      ctx.dispatch("fetchFavorites");
      ctx.dispatch("fetchNotifications");
    }
  },
  getters: {
    getAnnouncements: ctx => ctx.notifications?.announcements || [],
    getUpdates: ctx => ctx.notifications?.updates || [],
    loaded: ctx =>
      ctx.notifications?.announcements.length > 0 ||
      ctx.notifications?.updates ||
      false
  }
};
