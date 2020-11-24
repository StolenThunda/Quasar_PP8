import Vue from "vue";
import { ProPlayerLoopsManager } from "../../middleware/ProPlayerLoopsManager";
export default {
  namespaced: true,
  state: {
    currentCourse: null,
    currentSegment: null,
    currentSetup: { sources: null },
    currentLoops: null,
    sections: null,
    courseHistory: [],
    playerSettings: {
      speed: null,
      volume: null,
      zoomEnabled: false,
      zoom: 1,
      flipped: false
    },
    playerOpts: {
      controls: false
    },
    loopManager: new ProPlayerLoopsManager()
  },
  mutations: {
    FLIP_PLAYER(ctx) {
      console.log("b4", ctx.playerSettings.flipped);
      ctx.playerSettings.flipped = !ctx.playerSettings.flipped;
      console.log("aft", ctx.playerSettings.flipped);
    },
    LOAD_PLAYER_SETTINGS(ctx, objSettings) {
      Vue.set(
        ctx,
        "playerSettings",
        Object.assign({}, ctx.playerSettings, objSettings)
      );
    },
    SET_PACKAGE_DATA(ctx, data) {
      if (!data) return;
      if (ctx.currentCourse !== null) {
        if (ctx.courseHistory.length > 4) ctx.courseHistory.shift();
        ctx.courseHistory.push(ctx.currentCourse);
      }
      ctx.currentCourse = data;
      // map course to state
      for (let [k, v] of Object.entries(data)) {
        Vue.set(ctx, k, v);
      }
      // Object.assign({}, ctx, data);
    },
    SET_USER_LOOP_DATA(ctx, data) {
      ctx.currentLoops = data;
    },
    SET_CURRENT_SEGMENT_SETUP(ctx, data) {
      ctx.currentSetup = Object.assign({}, ctx.playerOpts, data);
    }
  },
  actions: {
    flipPlayer({ commit }, bool) {
      commit("FLIP_PLAYER");
    },
    loadPlayerSettings({ commit }, objSettings) {
      commit("LOAD_PLAYER_SETTINGS", objSettings);
    },
    async fetchUserLoopData(ctx, ID) {
      return await ctx.rootState.TXBA_UTILS.getUserLoopData(ID)
        .then(loopData => {
          console.log("loopData", loopData);
          return loopData;
        })
        .then(loopData => {
          ctx.commit("SET_USER_LOOP_DATA", response);
          return loopData;
        });
    },
    fetchUserLoop: (ctx, ID) => ctx.dispatch("fetchUserLoopData", ID),
    fetchPackage: (ctx, ID) => ctx.dispatch("fetchPackageData", ID),
    async fetchPackageData(ctx, ID) {
      return await ctx.rootState.TXBA_UTILS.getPackage(ID)
        .then(packageData => {
          // console.log("courseData", packageData);
          return packageData;
        })
        .then(packageData => {
          ctx.commit("SET_PACKAGE_DATA", packageData);
          return packageData;
        });
    },
    fetchSegment: (ctx, ID) => ctx.dispatch("fetchSegmentData", ID),
    async fetchSegmentData(ctx, ID) {
      const response = await ctx.rootState.TXBA_UTILS.getSegment(ID);
      // console.log("segData", response);
      ctx.commit("SET_CURRENT_SEGMENT", response);
    },
    playSegment(ctx, segmentId) {
      if (ctx.state.playSections) {
        const segmentData = ctx.state.playSections[0].segments.filter(
          itm => itm.id === segmentId
        )[0];
        // console.log("seg-data", segmentData);
        if (segmentData) ctx.commit("SET_CURRENT_SEGMENT_SETUP", segmentData);
      }
      return segmentId;
    }
  },
  getters: {
    getPlaySections: ctx => {
      return ctx.playSections;
    }
  }
};
