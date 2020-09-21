import Vue from "vue";

const compObjects = (obj1, obj2) => Object.entries(obj1).join() === Object.entries(obj2).join() 
export default {
  namespaced: true,
  state: {
    drawer: [],
    currentCategory: "",
    searching: false,
    default_browser_entries: null,
    search_entries: null,
    liveSearch: [],
    search: {
      pages: null,
      current: new Set(),
      criteria: null,
      status: {}
    }
  },
  mutations: {
    SET_CURRENT_CATEGORY ( ctx, category ) {
      if ( category ) ctx.currentCategory = category;
    },
    ADD_TO_DRAWER ( ctx, content ) {
      if ( content ) {
        content.forEach( ( tab, idx ) => {
          const tabIdx = ctx.drawer.findIndex( x => x.name === tab.name );
          if ( tabIdx == -1 ) {
            tab.id = idx;
            ctx.drawer.push( tab );
          }
        }, ctx );
      }
    },
    REMOVE_DRAWER ( ctx, name ) {
      console.log( `Removing: ${name}` )
      ctx.drawer.pop();
    },
    TOGGLE_SEARCHING ( ctx, bool ) {
      ctx.searching = bool;
    },
    SET_ENTRIES_PAGINATION(ctx, pages) {
      // console.log('pages', pages)
      if (pages) ctx.search.pages = pages;
    },
    SET_DEFAULT_BROWSER_ENTRIES ( ctx, data ) {
      // console.log("SettingDefEntries:", data);
      if ( data ) ctx.default_browser_entries = data;
    },
    SET_SEARCH_ENTRIES ( ctx, data ) {
      // console.log("SettingEntries:", data);
      if ( data ) ctx.search_entries = data;
    },
    SET_SEARCH ( ctx, data ) {
      // console.log( "SettingCriteria:", data );
      if ( data.auth ) Vue.set( ctx, "auth", data.auth );
      // ctx.search.criteria = ;
      // ctx.search.status = data.status;
      // ctx.search.current = new Set();
      // ctx.search.pages = [];
      Vue.set(ctx.search, "criteria", data.funnels ? data.funnels : null)
      Vue.set(ctx.search, 'status', data.status)
      Vue.set(ctx.search, 'current', new Set())
      Vue.set(ctx.search, 'pages', [])
    },
    TOGGLE_CURRENT_SEARCH ( ctx, data) {
      // toggle selection status
      ctx.search.status[data.sync] = !ctx.search.status[data.sync];
    },
    UPDATE_FILTER_SELECTIONS(ctx, data) {
      if (!data){ ctx.search.current.clear(); return;}
      // update list of current selections
      
      console.log("data", data)
      if (ctx.search.current.has(data)) {
        console.log('found')
        ctx.search.current.delete(data)
      }else{
        console.log('not found')
        ctx.search.current.add(data)
      }
      
      console.log("current", ctx.search.current)
      ctx.searching = ctx.search.current.size > 0
      ctx.liveSearch = Array.from(ctx.search.current || []);

    }
  },
  actions: {
    async gotoPage(ctx, url){
      const searchEntries = await ctx.rootState.TXBA_UTILS.getSearchEntries(ctx.currentCategory, ctx.getters.getAuth,url);

      console.log(JSON.stringify(searchEntries, null, 4))
      ctx.commit("SET_ENTRIES_PAGINATION", searchEntries.pages);

      return ctx.commit("SET_SEARCH_ENTRIES", searchEntries.filters);
    },
    addToDrawer ( ctx, content ) {
      return ctx.commit( "ADD_TO_DRAWER", content );
    },
    removeDrawer ( ctx, name ) {
      return ctx.commit( "REMOVE_DRAWER", name );
    },
    removeFilter (ctx, data ) {
      ctx.commit("UPDATE_FILTER_SELECTIONS", data);
    },
    toggleSearchCriteria ( ctx, itm ) {
      ctx.commit( "TOGGLE_CURRENT_SEARCH", itm );
      ctx.commit( "UPDATE_FILTER_SELECTIONS", itm );
    },
    async fetchDefaultSearch ( ctx ) {
      // debugger
      const entries = await ctx.rootState.TXBA_UTILS.getDefaultSearchEntries();
      // console.log('ENTRIES',entries)
      ctx.commit( "SET_ENTRIES_PAGINATION", entries.pages );
      return ctx.commit( "SET_DEFAULT_BROWSER_ENTRIES", entries.filters );
    },
    async setCriteria ( ctx, category ) {
      const filters = await ctx.rootState.TXBA_UTILS.getSearchFiltersByCategory(
        category
        );
        
      ctx.commit( "SET_CURRENT_CATEGORY", category );
      
      ctx.commit( "SET_SEARCH", filters );

      const searchEntries = await ctx.rootState.TXBA_UTILS.getSearchEntries(
        category,
        ctx.getters.getAuth
      );

      // console.log(JSON.stringify(searchEntries, null, 4))
      ctx.commit("SET_ENTRIES_PAGINATION", searchEntries.pages);

      ctx.commit( "SET_SEARCH_ENTRIES", searchEntries.filters );
    },
    initStore: ctx => {
      ctx.dispatch("fetchDefaultSearch");
    }
  },
  getters: {
    // getFilters: state => Array.from(state.search.current || []),
    default_browser_entries: state => state.default_browser_entries,
    // isSearching: state => state.searching,
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
