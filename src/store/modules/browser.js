import Vue from "vue";
export default {
  namespaced: true,
  state: {
    searching: false,
    default_browser_entries: null,
    search_entries: null,
    search: {
      criteria: null,
      searchCategories: []
    }
  },
  mutations: {
    TOGGLE_SEARCHING(ctx, bool) {
      ctx.searching = bool;
    },
    SET_DEFAULT_BROWSER_ENTRIES(ctx, data) {
      // console.log("SettingDefEntries:", data);
      if (data) ctx.default_browser_entries = data;
    },
    SET_SEARCH_ENTRIES(ctx, data) {
      console.log("SettingEntries:", data);
      if (data) ctx.search_entries = data;
    },
    SET_CRITERIA(ctx, data) {
      console.log("SettingCriteria:", data);
      if (data.auth) Vue.set(ctx, "auth", data.auth);
      ctx.search.criteria = data.funnels ? data.funnels : null;
    },
    TOGGLE_CURRENT_SEARCH(ctx, data) {
      const cats = ctx.search.searchCategories;
      const idx = cats.findIndex(obj => obj === data);
      if (idx >= 0) {
        // already in array so remove
        ctx.search.searchCategories = [
          ...cats.slice(0, idx),
          ...cats.slice(idx + 1)
        ];
      } else {
        ctx.search.searchCategories.push(data);
      }
    }
  },
  actions: {
    toggleSearchCriteria(ctx, itm) {
      ctx.dispatch("setSearching", true);
      return ctx.commit("TOGGLE_CURRENT_SEARCH", itm);
    },
    async fetchDefaultSearch(ctx) {
      // debugger
      const entries = await ctx.rootState.TXBA_UTILS.getDefaultSearchEntries()
      // console.log(JSON.stringify(entries, null,2))
      return ctx.commit(
        "SET_DEFAULT_BROWSER_ENTRIES", entries
      );
    },
    async setCriteria(ctx, category) {
      const filters = await ctx.rootState.TXBA_UTILS.getSearchFiltersByCategory(
        category
      );
      ctx.commit( "SET_CRITERIA", filters );
      const searchEntries = await ctx.rootState.TXBA_UTILS.getSearchEntries(
        category,
        ctx.getters.getAuth
      );

      console.log(JSON.stringify(searchEntries, null, 4))
      ctx.commit(
        "SET_SEARCH_ENTRIES",
        searchEntries
      );
    },
    setSearching: (ctx, bool) => ctx.commit("TOGGLE_SEARCHING", ctx, bool),
    // initStore: ctx => {
    //   ctx.dispatch("fetchDefaultSearch");
    // }
  },
  getters: {
    default_browser_entries: state => state.default_browser_entries,
    showCurrentSearches: state => {
      return (
        state.search.searchCategories &&
        state.search.searchCategories.length > 0
      );
    },
    // getDTEntries(state) {
    //   const entries = [];
    //   const headers = [
    //     {
    //       text: "",
    //       value: "avatar"
    //     },
    //     {
    //       text: "Title",
    //       value: "title"
    //     },
    //     {
    //       text: "Data",
    //       value: "data"
    //     },
    //     {
    //       text: "Fav?",
    //       value: "isFav"
    //     }
    //   ];
    //   console.log("entr", Object.keys(state.search_entries));
    //   state.search_entries.forEach(entry => {
    //     console.log("entry", entry);
    //     const itm = {
    //       avatar: entry.avatar,
    //       title: entry.title,
    //       data: entry.data,
    //       isFav: entry.isFav
    //     };
    //     entries.push(itm);
    //   });
    //   let obj = { items: entries, headers: headers };
    //   console.log("obj", obj);
    //   return obj;
    // },
    getAuth: () => {
      return "eyJyZXN1bHRfcGFnZSI6InByb3BsYXllcjc0LXRvbnlcLy0tYWpheC1icm93c2VyLXNlYXJjaC1lbnRyaWVzXC9";
      // .replace(/wZXJmb3JtYW5jZXNcLyJ9/g, '')
      // const xtra = 'wZXJmb3JtYW5jZXNcLyJ9';
      // const idx = state.auth.params.indexOf(xtra);
      // let key = state.auth.params.slice(0, 87);
      // console.log('param', state.auth.params)
      // console.log('idx', idx)
      // console.log('  key', key)
      // return key;
    }
  }
};
