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
      current: [],
      criteria: null,
      status: {}
    }
  },
  mutations: {
    SET_CURRENT_CATEGORY ( ctx, category ) {
      if ( category ) ctx.currentCategory = category;
    },
    ADD_TO_DRAWER ( ctx, content ) {
      // console.log(`Content: ${typeof content}`);
      // console.log(
      //   `Before Add: ${JSON.stringify( ctx.drawer )} || ${JSON.stringify(
      //     content
      //   )}`
      // );
      if ( content ) {
        content.forEach( ( tab, idx ) => {
          // console.log( `InspTab ${JSON.stringify( tab )}` );
          const tabIdx = ctx.drawer.findIndex( x => x.name === tab.name );
          // console.log(
          //   `${Boolean( tabIdx > -1 ) ? "Tab already created" : "Creating tab"}`
          // );
          if ( tabIdx == -1 ) {
            tab.id = idx;
            // console.log( `adding new: ${JSON.stringify( tab )}` );
            ctx.drawer.push( tab );

            // console.log( `After adding tab:` );
            // console.dir( ctx.drawer );
          }
        }, ctx );
      }
      // console.log( `drw:` );
      // console.dir( ctx.drawer );
    },
    REMOVE_DRAWER ( ctx, name ) {
      console.log( `Removing: ${name}` )
      ctx.drawer.pop();
    },
    TOGGLE_SEARCHING ( ctx, bool ) {
      ctx.searching = bool;
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
      ctx.search.criteria = data.funnels ? data.funnels : null;
      // create object keys of ids in the status object
      for (const id of data.ids) { ctx.search.status[id] = false}
      ctx.search.current = [];
      ctx.search.status = {};
    },
    TOGGLE_CURRENT_SEARCH ( ctx, data) {
      // toggle selection status
      const chipID = data.section + '__' + data.chip.id
      ctx.search.status[chipID] = !ctx.search.status[chipID];
      if (ctx.search.status[chipID]) ctx.search.current.push(data.chip)
    },
    UPDATE_FILTER_SELECTIONS(ctx, data) {
      if (!data){ ctx.search.current = []; return;}
      // update list of current selections
      const current = ctx.search.current;
      const idx = current.findIndex( obj => obj === data);
      if ( idx >= 0 ) {        // already in array so remove
        ctx.search.current = [
          ...current.slice( 0, idx ),
          ...current.slice( idx + 1 )
        ];
      } else if (idx == -1) {
        ctx.search.current.push( data );
      } else {
        if (ctx.search.current.length == 1) ctx.search.current = [];
      }
    }
  },
  actions: {
    addToDrawer ( ctx, content ) {
      return ctx.commit( "ADD_TO_DRAWER", content );
    },
    removeDrawer ( ctx, name ) {
      return ctx.commit( "REMOVE_DRAWER", name );
    },
    removeFilter (ctx, data ) {
      // console.log(`rm filter: ${JSON.stringify(data)}`)
      ctx.commit("UPDATE_FILTER_SELECTIONS", data);
    },
    toggleSearchCriteria ( ctx, itm ) {
      console.dir(itm)
      const data = JSON.parse(JSON.stringify(itm))
      // ctx.dispatch( "setSearching", true );
      ctx.commit( "TOGGLE_CURRENT_SEARCH", data );
      ctx.commit( "UPDATE_FILTER_SELECTIONS", data.chip );
    },
    async fetchDefaultSearch ( ctx ) {
      // debugger
      const entries = await ctx.rootState.TXBA_UTILS.getDefaultSearchEntries();
      // console.log(JSON.stringify(entries, null,2))
      return ctx.commit( "SET_DEFAULT_BROWSER_ENTRIES", entries );
    },
    async setCriteria ( ctx, category ) {
      const filters = await ctx.rootState.TXBA_UTILS.getSearchFiltersByCategory(
        category
        );
        
      ctx.commit( "SET_CURRENT_CATEGORY", category );
      
      ctx.commit( "SET_SEARCH", filters );
      
      // ctx.commit( "UPDATE_FILTER_SELECTIONS");

      const searchEntries = await ctx.rootState.TXBA_UTILS.getSearchEntries(
        category,
        ctx.getters.getAuth
      );

      // console.log(JSON.stringify(searchEntries, null, 4))
      ctx.commit( "SET_SEARCH_ENTRIES", searchEntries );
    },
    setSearching: ( ctx, bool ) => ctx.commit( "TOGGLE_SEARCHING", ctx, bool ),
    initStore: ctx => {
      ctx.dispatch("fetchDefaultSearch");
    }
  },
  getters: {
    
    default_browser_entries: state => state.default_browser_entries,
    showCurrentSearches: state => {
      return (
        state.searchCategories &&
        state.searchCategories.length > 0
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
