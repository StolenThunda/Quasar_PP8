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
    drawer: [],
    activeCategory: "",
    searching: false,
    default_browser_entries: null,
    search_entries: null,
    activeFilters: {},
    // browserTool: new ProPlayerBrowser(),
    filterSectionList: new BrowserFilterSectionList(),
    filterStatus: {},
    search: {
      pages: null,
      current: new Set(),
      criteria: null
    }
  },
  mutations: {
    SET_CURRENT_CATEGORY(ctx, category) {
      if (category) ctx.activeCategory = category;
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
      // console.log("SettingCriteria:", data);
      // debugger
      if (data.auth) Vue.set(ctx, "auth", data.auth);
      Vue.set(ctx, "filterStatus", data.status || {});
      Vue.set(ctx, "activeFilters", {});
      Vue.set(ctx.search, "criteria", data.funnels ? data.funnels : null);
      Vue.set(ctx.search, "current", new Set());
      Vue.set(ctx.search, "pages", []);
    },
    TOGGLE_FILTER_STATUS(ctx, data) {
      // toggle selection status
      // console.log("current", ctx.filterStatus[data.sync]);
      Vue.set(ctx.filterStatus, data.sync, !ctx.filterStatus[data.sync]);
      // console.log("Status toggle", ctx.filterStatus[data.sync]);
    },
    VALIDATE_UNIQUE_FILTER(ctx, data) {
      if (!data) {
        ctx.search.current.clear();
        return;
      }
      // update list of current selections
      data = JSON.stringify(data);
      // console.log("data", data);
      if (ctx.search.current.has(data)) {
        // console.log("found");
        ctx.search.current.delete(data);
      } else {
        // console.log("not found");
        const objData = JSON.parse(data)
        if (objData.group.sectionStackable === 'no'){
          // filter is not stackable ... remove all other filters from the section
          ctx.search.current.forEach(itm => {
            const objItm = JSON.parse(itm);
            if (objItm.group.sectionId === objData.group.sectionId) {
              ctx.filterStatus[objItm.sync] = !ctx.filterStatus[objItm.sync];
              ctx.search.current.delete(itm);
            }
          })
        }
        ctx.search.current.add(data);
      }
      // console.log("current", ctx.search.current);
      ctx.searching = ctx.search.current.size > 0;
    },
    REFRESH_ACTIVE_FILTERS(ctx) {
      ctx.activeFilters = {};
      ctx.search.current.forEach(filter => {
        let objFilter = JSON.parse(filter);
        let id = objFilter.group.sectionId;
        if (ctx.activeFilters.hasOwnProperty(id)) {
          ctx.activeFilters[id].push(objFilter);
        } else {
          ctx.activeFilters[id] = [objFilter];
        }
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
    PROCESS_DEPENDENT_FILTERS(ctx, data) {
      console.log('procDeps', data);
      var chips = ctx.search.criteria[data.sectionID].chips;
      var filtered = chips.filter(chip =>
        data.ids.includes(parseInt(chip.value))
      );
      Vue.set(ctx.search.criteria[data.sectionID], "chips", filtered);
    }
  },
  actions: {
    async gotoPage(ctx, url) {
      const searchEntries = await ctx.rootState.TXBA_UTILS.getSearchEntries(
        ctx.activeCategory,
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
    removeFilter({ dispatch }, data) {
      dispatch("toggleSearchCriteria", data);
    },
    toggleSearchCriteria({ dispatch, state }, itm) {
      return dispatch("updateFilters", itm)
        .then(() => {
          console.log("Searching?:", state.searching);
          if (state.searching) {
            return dispatch("processDependents", itm).then(() =>
              dispatch("getFilteredResults")
            );
          } else {
            return dispatch("setCriteria", state.activeCategory);
          }
        })
        .catch(err => console.warn("ERROR", err));
    },
    async updateFilters({ dispatch }, itm) {
      return await dispatch("updateFilterStatus", itm)
        .then(itm => dispatch("updateFilterSet", itm))
        .then(() => dispatch("refreshActiveFilters"))
        .catch(err => console.log(err));
    },
    updateFilterStatus({ commit }, itm) {
      commit("TOGGLE_FILTER_STATUS", itm);
      return itm;
    },
    updateFilterSet({ commit, state }, itm) {
      commit("VALIDATE_UNIQUE_FILTER", itm);
      return state.searching;
    },
    refreshActiveFilters({ commit }) {
      return commit("REFRESH_ACTIVE_FILTERS");
    },
    async getFilteredResults({ rootState, state, getters, commit }) {
      const formdata = Object.assign(
        {
          channel: state.activeCategory
        },
        getters.getAuthObject,
        getters.getFilterList
      );
      console.log('filtered frm', formdata)
      const entries = await rootState.TXBA_UTILS.postAsyncData(formdata)
        .then(html => rootState.TXBA_UTILS.parseSearchResults(html.data))
        .then(searchEntries => {
          console.log("filtered entries", searchEntries);
          commit("SET_ENTRIES_PAGINATION", searchEntries.pages);
          commit("SET_SEARCH_ENTRIES", searchEntries.filters);
        })
        .catch(error => console.error("ERROR", error));
    },
    async processDependents({ dispatch, rootState }, itm) {
      return await dispatch("generateDependentURL", itm.group.sectionId)
        .then(url => {console.log('gend url', url); return url;})
        .then(url => dispatch("getFilterDependents", url))
        .then(data => dispatch("processDependentFilterSection", data));
    },
    async generateDependentURL({ dispatch, state }, sectionId) {
      console.log("processing deps", state.filterStatus);

      const strMasterSectionID = sectionId;
      const list = state.filterSectionList;
      const status = state.filterStatus;
      /* 
      #Order Of Operations 
      
      1. Get an array of dependencies for the master section being changed.
      2. Update each of those dependent sections.
        a. Scan through the sections each dependent section is dependent on.
        b. Get a list of all enabled inputs.
        c. Create the update url and update from that.
    */

      let theSection = list.getSectionByID(strMasterSectionID);
      let theChildren = theSection.getChildren();
      //If there aren't any dependents found, there's nothing to do
      if (theChildren.length == 0) {
        return;
      }

      this.n_DependentsToProcess = theChildren.length;
      list.rebuildFilterSectionKeys(status);

      for (let i = 0; i < theChildren.length; i++) {
        let childParents = theChildren[i].getParents();
        //initialize our tag and category filter strings
        let theTagKeys = "";
        let theCategoryKeys = "";

        //cycle through all sections we depend on and collect any checked input values.
        for (let j = 0; j < childParents.length; j++) {
          let theKeyIDsString = childParents[j].getKeyString();
          let theKeyType = childParents[j].getSectionType();
          if (theKeyType == "tag") {
            theTagKeys += theKeyIDsString;
          } else {
            theCategoryKeys += theKeyIDsString;
          }
        }

        // Check if any of the key strings is empty and set it to -1,
        // otherwise trim the last | off the end;
        if (theTagKeys == "") {
          theTagKeys = "-1";
        }
        if (theCategoryKeys == "") {
          theCategoryKeys = "-1";
        }

        /* 	
        Now we have a list of categories and tags to key on (from all sections we 
        depend on. We are ready to construct a url to send to the refiner.
      */
        if (theTagKeys !== "-1" || theCategoryKeys !== "-1") {
          let theURL = "/--ajax-browser-filter-refiner/";
          theURL += theChildren[i].getSectionID() + "/"; //what is the ID of the section we're updating
          theURL += theChildren[i].getSectionType() + "/"; //what type of items are we retrieving (cats or tags)
          theURL += theChildren[i].getChannelID() + "/"; //what channel are we looking at
          theURL += theChildren[i].getGroupID() + "/"; //what is the group (cat or tag) that we are filtering
          theURL += theCategoryKeys + "/"; //what are the categories we have to match
          theURL += theTagKeys + "/"; //what are the tags we have to match
          console.log("processing result", theURL);
          return theURL;
        } else {
          return dispatch(
            "restoreFilterSection",
            theChildren[i].getSectionID()
          );
        }
      }
    },
    async getFilterDependents({ rootState }, URL) {
      const data = await rootState.TXBA_UTILS.getAsyncData(URL);
      console.log('ret depdata', data)
      return data;
    },
    processDependentFilterSection({ commit }, data) {
      return commit("PROCESS_DEPENDENT_FILTERS", data);
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
      ctx.commit("SET_ENTRIES_PAGINATION", searchEntries.pages);
      ctx.commit("SET_SEARCH_ENTRIES", searchEntries.filters);
      ctx.commit("BUILD_SECTION_DATA");
    },
    initStore: ctx => {
      ctx.dispatch("fetchDefaultSearch");
    }
  },
  getters: {
    isSearching: state => state.search.current.size > 0,
    getFilters: state =>
      Object.fromEntries(
        Object.entries(state.filterStatus).filter(
          ([key, value]) => value === true
        )
      ),
    default_browser_entries: state => state.default_browser_entries,
    getAuthObject: state => state.auth,
    getFilterList: state => {
      let filters = {};    
        Object.keys(state.activeFilters).forEach(section => {
          state.activeFilters[section].forEach(itm => {
            if (filters.hasOwnProperty(itm.name)){
              filters[itm.name].push(parseInt(itm.value))
            } else{ 
              filters[itm.name] = [parseInt(itm.value)];
            }
          });
        });
        
        Object.keys(filters).forEach(key => {
          filters[key] =  (filters[key].length > 1) ? JSON.stringify(filters[key]) : filters[key][0];

        })
      return filters;
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
