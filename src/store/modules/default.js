import Vue from "vue";
export default {
  namespaced: true,
  state: {
    sidebarTabs: [],
    favorites: [],
    notifications: null
  },
  mutations: {
    RESET_SIDEBAR(ctx) {
      // console.log(`Resetting Sidebar to default: ${JSON.stringify(ctx)}`);
      ctx.sidebarTabs = [];
    },
    SET_FAVS(ctx, favs) {
      // console.log("SettingFAVS:", favs);      
        Vue.set(ctx, 'favorites', favs);      
      // console.log('Set favs', ctx.favorites)
    },
    SET_NOTIFICATIONS(ctx, notes) {
      // console.log("SettingNotes:", notes);
      if (notes) ctx.notifications = notes;
    },
    ADD_SB_TABS(ctx, tabs) {
      // console.dir(ctx);
      // console.log(`Before Add: ${ctx.sidebarTabs} || ${JSON.stringify(tabs)}`);
      if (tabs) {
        tabs.forEach((tab, idx) => {
          // console.log(`InspTab ${JSON.stringify(tab)}`);

          const tabIdx = ctx.sidebarTabs.findIndex(x => x.name === tab.name);
          // console.log(`Found: ${Boolean(tabIdx > -1)}`);
          if (tabIdx == -1) {
            tab.id = idx;
            // console.log(`adding new: ${JSON.stringify(tab)}`);
            ctx.sidebarTabs.unshift(tab);
            // console.log(`After adding tab:`);
            // console.dir(ctx.sidebarTabs);
          }
        }, ctx);
      }
    },
    DEL_SB_TAB(ctx, name) {
      console.log(`Deleting tab: ${name}`);
    },
    FAVORITE(state, objFav) {
      state.favorites.push(objFav)
    },
    UNFAVORITE(state, id) {
      // console.log(state.favorites);
        let filteredFavs = state.favorites.filter(el => el.id !== id);
        console.log("filtered", filteredFavs);
        Vue.set(state, 'favorites', filteredFavs);
      return false;
    }
  },
  actions: {
    resetSideBar(ctx) {
      ctx.commit("RESET_SIDEBAR", ctx);
      ctx.dispatch("setDefaultTabs");
    },
    setDefaultTabs(ctx) {
      const tabs = [
        {
          name: "Favorites",
          componentName: "FavList",
          icon: "favorite",
          cmp: () => import("components/FavoritesList")
        }
      ];
      // console.log(`Adding Def Tab: ${JSON.stringify(tabs)}`);
      return ctx.commit("ADD_SB_TABS", tabs);
    },
    addSidebarTabs(ctx, tabs) {
      // console.log(`ACT_ADD: ${JSON.stringify(tabs)}`);
      return ctx.commit("ADD_SB_TABS", tabs || []);
    },
    removeSidebarTab(ctx, name) {
      return ctx.commit("DEL_SB_TABS", name);
    },
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
    addFavorite({ commit }, fav) {
      commit("FAVORITE", fav);
    },
    removeFavorite({ commit }, id) {
      commit("UNFAVORITE", id);
    },
    initStore: ctx => {
      ctx.dispatch("fetchFavorites");
      ctx.dispatch("fetchNotifications");
      ctx.dispatch("resetSideBar");
    }
  },
  getters: {
    getFavsByType: state => {
      let collector = {}
      state.favorites.forEach(el => {
        if (Object.keys(collector).includes(el.src) ){
          collector[el.src].push(el)
        }else{
          collector[el.src] = [ el ]
        }
      })
      // console.log(collector);
      return collector;
    },
    isFavorite: state => favorite => {
      favorite = JSON.parse(favorite);
      return state.favorites.filter(fav => fav.id === favorite.id).length > 0;
    },
    getAnnouncements: ctx => ctx.notifications?.announcements || [],
    getUpdates: ctx => ctx.notifications?.updates || [],
    loaded: ctx =>
      ctx.notifications?.announcements.length > 0 ||
      ctx.notifications?.updates ||
      false
  }
};
