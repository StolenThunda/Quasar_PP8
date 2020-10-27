import Vue from "vue";
import { ProPlayerLoopsManager } from "../../middleware/ProPlayerLoopsManager";
export default {
  namespaced: true,
  state: {
    currentCourse: null,
    currentSegment: null,
    currentSetup: { sources: null},
    currentLoops: null,
    sections: null,
    courseHistory: [], 
    playerOpts: {
      controls: false
    },
    loopManager: new ProPlayerLoopsManager
  },
  mutations: {
    SET_PACKAGE_DATA(ctx, data) {
      if (!data) return;
      // console.log("SettingCourse:", data);
      if (ctx.currentCourse !== null)
        ctx.courseHistory.push(ctx.currentCourse);
      ctx.currentCourse = data;
      // map course to state
      for (let [k, v] of Object.entries(data)) {
        Vue.set(ctx, k, v);
      }
      Object.assign({}, ctx, data);
    },
    SET_USER_LOOP_DATA(ctx, data) {
      ctx.currentLoops = data;
    },
    SET_CURRENT_SEGMENT_SETUP(ctx, data) {
      ctx.currentSetup = Object.assign({}, ctx.playerOpts, data);
    }
  },
  actions: {
    async fetchUserLoopData(ctx, ID) {
      const response = await ctx.rootState.TXBA_UTILS.getUserLoopData(ID);
      // console.log('courseData', response)
      ctx.commit("SET_USER_LOOP_DATA", response);
    },
    fetchUserLoop: (ctx, ID) => ctx.dispatch("fetchUserLoopData", ID),
    fetchPackage: (ctx, ID) => ctx.dispatch("fetchPackageData", ID),
    async fetchPackageData(ctx, ID) {
      const response = await ctx.rootState.TXBA_UTILS.getPackage(ID);
      // console.log('courseData', response)
      ctx.commit("SET_PACKAGE_DATA", response);
    },
    fetchSegment: (ctx, ID) => ctx.dispatch("fetchSegmentData", ID),
    async fetchSegmentData(ctx, ID) {
      const response = await ctx.rootState.TXBA_UTILS.getSegment(ID);
      // console.log('segData', response)
      ctx.commit("SET_CURRENT_SEGMENT", response);
    },
    setCurrentSegmentSetup(ctx, setup) {
      console.log(setup);
      if (setup) ctx.commit("SET_CURRENT_SEGMENT_SETUP", JSON.parse(setup));
    }
  },
  getters: {
    getPlaySections: ctx => {
      return ctx.playSections;
    }
  }
};
