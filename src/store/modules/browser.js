import Vue from "vue";
export default {
  namespaced: true,
  state: {
    drawer: [],
    currentCategory: "",
    searching: false,
    default_browser_entries: null,
    search_entries: null,
    search: {
      criteria: null,
      searchCategories: []
    }
  },
  mutations: {
    SET_CURRENT_CATEGORY(ctx, category){
      if (category) ctx.currentCategory = category;
    },
    ADD_TO_DRAWER(ctx, content) {
      // console.log(`Content: ${typeof content}`);
      console.log(
        `Before Add: ${JSON.stringify(ctx.drawer)} || ${JSON.stringify(
          content
        )}`
      );
      if (content) {
        content.forEach((tab, idx) => {
          console.log(`InspTab ${JSON.stringify(tab)}`);

          const tabIdx = ctx.drawer.findIndex(x => x.name === tab.name);
          console.log(
            `${Boolean(tabIdx > -1) ? "Tab already created" : "Creating tab"}`
          );
          if (tabIdx == -1) {
            tab.id = idx;
            console.log(`adding new: ${JSON.stringify(tab)}`);
            ctx.drawer.push(tab);

            console.log(`After adding tab:`);
            console.dir(ctx.drawer);
            //  Vue.set(ctx, "drawer", ...ctx.drawer);
          }
        }, ctx);
      }
      console.log(`drw:`);
      console.dir(ctx.drawer);
    },
    REMOVE_DRAWER(ctx, name) {
      console.log(`Removing: ${name}`)
      ctx.drawer.pop();
    },
    TOGGLE_SEARCHING(ctx, bool) {
      ctx.searching = bool;
    },
    SET_DEFAULT_BROWSER_ENTRIES(ctx, data) {
      // console.log("SettingDefEntries:", data);
      if (data) ctx.default_browser_entries = data;
    },
    SET_SEARCH_ENTRIES(ctx, data) {
      // console.log("SettingEntries:", data);
      if (data) ctx.search_entries = data;
    },
    SET_CRITERIA(ctx, data) {
      console.log("SettingCriteria:", data);
      if (data.auth) Vue.set(ctx, "auth", data.auth);
      ctx.search.criteria = data.funnels ? data.funnels : null;
      // console.log(`Criteria: ${JSON.stringify(ctx.search.criteria, null, 2)}`)
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
    addToDrawer(ctx, content) {
      return ctx.commit("ADD_TO_DRAWER", content);
    },
    removeDrawer(ctx, name) {      
      return ctx.commit("REMOVE_DRAWER", name);
    }, 
    toggleSearchCriteria(ctx, itm) {
      ctx.dispatch("setSearching", true);
      return ctx.commit("TOGGLE_CURRENT_SEARCH", itm);
    },
    async fetchDefaultSearch(ctx) {
      // debugger
      const entries = await ctx.rootState.TXBA_UTILS.getDefaultSearchEntries();
      // console.log(JSON.stringify(entries, null,2))
      return ctx.commit("SET_DEFAULT_BROWSER_ENTRIES", entries);
    },
    async setCriteria(ctx, category) {
      const filters = await ctx.rootState.TXBA_UTILS.getSearchFiltersByCategory(
        category
      );
      
      ctx.commit("SET_CURRENT_CATEGORY", category);
      ctx.commit("SET_CRITERIA", filters);
      const searchEntries = await ctx.rootState.TXBA_UTILS.getSearchEntries(
        category,
        ctx.getters.getAuth
      );

      // console.log(JSON.stringify(searchEntries, null, 4))
      ctx.commit("SET_SEARCH_ENTRIES", searchEntries);
    },
    setSearching: (ctx, bool) => ctx.commit("TOGGLE_SEARCHING", ctx, bool)
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
