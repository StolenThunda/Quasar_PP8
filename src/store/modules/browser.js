import Vue from "vue";
import {
  ProPlayerBrowser,
  BrowserFilterSection,
  BrowserFilterSectionList
} from "../../middleware/ProPlayerBrowser";

const compObjects = (obj1, obj2) =>
  Object.entries(obj1).join() === Object.entries(obj2).join();
export default {
  namespaced: true,
  state: {
    toggleCount: 0,
    drawer: [],
    currentCategory: "",
    searching: false,
    default_browser_entries: null,
    search_entries: null,
    liveSearch: [],
    browserTool: new ProPlayerBrowser(),
    filterSectionList: new BrowserFilterSectionList(),
    filterStatus: {},
    search: {
      pages: null,
      current: new Set(),
      criteria: null,
    }
  },
  mutations: {
    SET_CURRENT_CATEGORY(ctx, category) {
      if (category) ctx.currentCategory = category;
    },
    ADD_TO_DRAWER(ctx, content) {
      if (content) {
        content.forEach((tab, idx) => {
          const tabIdx = ctx.drawer.findIndex(x => x.name === tab.name);
          if (tabIdx == -1) {
            tab.id = idx;
            ctx.drawer.push(tab);
          }
        }, ctx);
      }
    },
    REMOVE_DRAWER(ctx, name) {
      console.log(`Removing: ${name}`);
      ctx.drawer.pop();
    },
    TOGGLE_SEARCHING(ctx, bool) {
      ctx.searching = bool;
    },
    SET_ENTRIES_PAGINATION(ctx, pages) {
      // console.log('pages', pages)
      if (pages) ctx.search.pages = pages;
    },
    SET_DEFAULT_BROWSER_ENTRIES(ctx, data) {
      // console.log("SettingDefEntries:", data);
      if (data) ctx.default_browser_entries = data;
    },
    SET_SEARCH_ENTRIES(ctx, data) {
      // console.log("SettingEntries:", data);
      if (data) ctx.search_entries = data;
    },
    SET_SEARCH(ctx, data) {
      // console.log( "SettingCriteria:", data );
      if (data.auth) Vue.set(ctx, "auth", data.auth);
      Vue.set(ctx, "filterStatus", data.status || {});
      Vue.set(ctx.search, "criteria", data.funnels ? data.funnels : null);
      Vue.set(ctx.search, "current", new Set());
      Vue.set(ctx.search, "pages", []);
    },
    TOGGLE_CURRENT_SEARCH(ctx, data) {
        // toggle selection status`)
        // console.log("current", ctx.filterStatus[data.sync]);
        Vue.set(ctx.filterStatus, data.sync, !ctx.filterStatus[data.sync]);
        // console.log("after", ctx.filterStatus[data.sync]);
    },
    UPDATE_FILTER_SELECTIONS(ctx, data) {
      return new Promise((resolve, reject) => {
        if (!data) {
          ctx.search.current.clear();
          return;
        }
        // update list of current selections
        // console.log("data", data);
        if (ctx.search.current.has(data)) {
          // console.log("found");
          ctx.search.current.delete(data);
        } else {
          // console.log("not found");
          ctx.search.current.add(data);
        }

        // console.log("current", ctx.search.current);
        ctx.searching = ctx.search.current.size > 0;
        ctx.liveSearch = Array.from(ctx.search.current || []);
        resolve(true);
      });
    },
    BUILD_SECTION_DATA(ctx) {
      ctx.filterSectionList.reset();
      for (let [k, v] of Object.entries(ctx.search.criteria)) {
        let newSectionObject = new BrowserFilterSection();
        newSectionObject.setSectionID(v.sectionId);
        newSectionObject.setSectionType(v.sectionType);
        newSectionObject.setChannelID(v.sectionChannelId);
        newSectionObject.setGroupID(v.sectionGroupId);

        let tmpDependenciesArray = null;
        let tmpDependenciesString = v.sectionDependencies;
        if (tmpDependenciesString != "") {
          tmpDependenciesArray = tmpDependenciesString.split("|");
        } else {
          tmpDependenciesArray = [];
        }

        newSectionObject.setParentIDs(tmpDependenciesArray);
        ctx.filterSectionList.addSection(newSectionObject);
      }

      ctx.filterSectionList.computeSectionFamilies();
    },
    PROCESS_DEPENDENT_FILTERS(ctx, data){
      console.log(data)
      var chips = ctx.search.criteria[data.sectionID].chips;
      var filtered = chips.filter( chip => data.ids.includes(parseInt(chip.value)))
      Vue.set(ctx.search.criteria[data.sectionID], 'chips', filtered)
      
    },
  },
  actions: {
    async gotoPage(ctx, url) {
      const searchEntries = await ctx.rootState.TXBA_UTILS.getSearchEntries(
        ctx.currentCategory,
        ctx.getters.getAuth,
        url
      );

      console.log(JSON.stringify(searchEntries, null, 4));
      ctx.commit("SET_ENTRIES_PAGINATION", searchEntries.pages);

      return ctx.commit("SET_SEARCH_ENTRIES", searchEntries.filters);
    },
    addToDrawer(ctx, content) {
      return ctx.commit("ADD_TO_DRAWER", content);
    },
    removeDrawer(ctx, name) {
      return ctx.commit("REMOVE_DRAWER", name);
    },
    removeFilter(ctx, data) {
      ctx.commit("UPDATE_FILTER_SELECTIONS", data);
    },
    async toggleSearchCriteria({ dispatch }, itm) {
      return await dispatch('toggleCurrentSearch', itm)
        .then(status => {
          console.log('after stat')
          if (status) dispatch('updateFilters', itm)
        })
        .then(dispatch('processDependents', itm))
        .catch(console.log);
    },
    async toggleCurrentSearch({ commit , state}, itm){
      try {
        commit("TOGGLE_CURRENT_SEARCH", itm)
        return Promise.resolve(state.filter[itm.sync])
      } catch (error) {
        console.log(error)
        return Promise.reject(false)        
      }
    },
    async updateFilters({ commit }, itm){
    
      try {
        commit("UPDATE_FILTER_SELECTIONS", itm)
        return Promise.resolve(true)
      } catch (error) {
        console.log(error)
        return Promise.reject(false)        
      }
    },
    async processDependents({ dispatch, rootState }, itm){
      return dispatch('updateFilterSelections', itm.group.sectionId)
        .then(url => rootState.TXBA_UTILS.getAsyncData(url))
        .then(data => dispatch('processDependentFilterSection', data))
        .catch(console.log);
    },
    updateFilterSelections({state}, sectionId) {
      console.log("processing deps", state.filterStatus);
      return state.browserTool.processDependents({
        strMasterSectionID: sectionId,
        list: state.filterSectionList,
        status: state.filterStatus
      });
    },
    processDependentFilterSection({commit}, data){
      return commit('PROCESS_DEPENDENT_FILTERS', data);
    }, 
    async fetchDefaultSearch(ctx) {
      // debugger
      const entries = await ctx.rootState.TXBA_UTILS.getDefaultSearchEntries();
      // console.log('ENTRIES',entries)
      ctx.commit("SET_ENTRIES_PAGINATION", entries.pages);
      return ctx.commit("SET_DEFAULT_BROWSER_ENTRIES", entries.filters);
    },
    async setCriteria(ctx, category) {
      const filters = await ctx.rootState.TXBA_UTILS.getSearchFiltersByCategory(
        category
      );

      ctx.commit("SET_CURRENT_CATEGORY", category);

      ctx.commit("SET_SEARCH", filters);

      const searchEntries = await ctx.rootState.TXBA_UTILS.getSearchEntries(
        category,
        ctx.getters.getAuth
      );

      // console.log("search entries", JSON.stringify(searchEntries, null, 4))
      ctx.commit("SET_ENTRIES_PAGINATION", searchEntries.pages);

      ctx.commit("SET_SEARCH_ENTRIES", searchEntries.filters);

      ctx.commit("BUILD_SECTION_DATA");
    },
    initStore: ctx => {
      ctx.dispatch("fetchDefaultSearch");
    }
  },
  getters: {
    getCurrent: state => Array.from(state.search.current || []),
    getFilters: state =>
      Object.fromEntries(
        Object.entries(state.filterStatus).filter(
          ([key, value]) => value === true
        )
      ),
    default_browser_entries: state => state.default_browser_entries,
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
