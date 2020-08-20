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
      console.log(`Resetting Sidebar to default: ${JSON.stringify(ctx)}`);
      ctx.sidebarTabs = [];
    },
    SET_FAVS(ctx, favs) {
      // console.log("SettingFAVS:", favs);
      if (favs) ctx.favorites = favs;
    },
    SET_NOTIFICATIONS(ctx, notes) {
      // console.log("SettingNotes:", notes);
      if (notes) ctx.notifications = notes;
    },
    ADD_SB_TABS(ctx, tabs) {
      console.dir(ctx);
      console.log(`Before Add: ${ctx.sidebarTabs} || ${JSON.stringify(tabs)}`);
      if (tabs) {
        tabs.forEach((tab, idx, srcArr) => {
          console.log(`InspTab ${JSON.stringify(tab)}`);

          const tabIdx = ctx.sidebarTabs.findIndex(x => x.name === tab.name);
          console.log(`Found: ${Boolean(tabIdx > -1)}`);
          if (tabIdx == -1) {
            tab.id = idx;
            console.log(`adding new: ${JSON.stringify(tab)}`);
            ctx.sidebarTabs.push(tab);
          }
        });
      }
      console.dir(ctx.sidebarTabs);
    },
    DEL_SB_TAB(ctx, name) {
      console.log(`Deleting tab: ${name}`);
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
      console.log(`Adding Def Tab: ${JSON.stringify(tabs)}`);
      return ctx.commit("ADD_SB_TABS", tabs);
    },
    addSidebarTabs(ctx, tabs) {
      console.log(`ACT_ADD: ${JSON.stringify(tabs)}`);
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
    removeFavorite(ctx, id) {
      console.log(ctx.state.favorites);
      const tabIdx = ctx.state.favorites?.Courses.findIndex(x => x.id === id);
      if (tabIdx > -1) {
        console.log(`Removing ID ${id} @ idx ${tabIdx} `);
        ctx.state.favorites.Courses.splice(tabIdx, 1);
        Vue.set(ctx.state.favorites, "Courses", ...ctx.state.favorites.Courses);
        return true;
      }
      const importedIdx = ctx.state.favorites?.Imported.findIndex(
        x => x.id === id
      );
      if (importedIdx > -1) {
        console.log(`Removing ID ${id} @ idx ${importedIdx} `);
        ctx.state.favorites.Imported.splice(importedIdx, 1);
        Vue.set(
          ctx.state.favorites.Imported,
          "Imported",
          ...ctx.state.favorites.Imported
        );
        return true;
      }
      return false;
    },
    initStore: ctx => {
      ctx.dispatch("fetchFavorites");
      ctx.dispatch("fetchNotifications");
      ctx.dispatch("resetSideBar");
      
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
