import Vue from "vue";
import { LoopsManager, CommentsManager } from "../../middleware/ProPlayerCore";

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
    loopManager: new LoopsManager(),
    commentManager: new CommentsManager()
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
    SET_CURRENT_COURSE(ctx, data) {
      if (!data) return;
      if (ctx.currentCourse !== null) {
        // if (ctx.courseHistory.length > 4) ctx.courseHistory.shift();
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
    SET_CURRENT_SEGMENT(ctx, data) {
      console.log("CurrentSegment", data);
      ctx.currentSegment = data;
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
    fetchComments({ dispatch }, pID) {
      return dispatch("fetchCommentsData", pID);
    },
    async fetchCommentsData(ctx, pID) {
      const comments = await ctx.rootState.TXBA_UTILS.getComments(pID, pID);
      // console.log('coms', comments)
      return comments;
    },
    async fetchUserLoopData(ctx, ID) {
      return await ctx.rootState.TXBA_UTILS.getUserLoops(ID)
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
          console.log("PackageData", packageData);
          return packageData;
        })
        .then(packageData => {
          ctx.commit("SET_CURRENT_COURSE", packageData);
          return packageData;
        })
        .then(packageData => {
          // get first segment data
          const firstSeg = packageData.sections.find(
            ({ sectionTitle }) => "Segments"
          ).segments[0];
          ctx.dispatch("fetchSegment", firstSeg.segmentID).then( id => ctx.dispatch("setCurrentSegmentSetup", id))
          return packageData;
        });
    },
    fetchSegment: (ctx, ID) => ctx.dispatch("fetchSegmentData", ID),
    async fetchSegmentData(ctx, ID) {
      const response = await ctx.rootState.TXBA_UTILS.getSegment(ID);
      console.log("segData", response);
      ctx.commit("SET_CURRENT_SEGMENT", response);
      return ID;
    },
    setCurrentSegmentSetup(ctx, segmentId) {
      var segmentData = null;
      if (ctx.state.playSections) {
        segmentData = ctx.state.playSections[0].segments.filter(
          itm => itm.id === segmentId
        )[0];
        console.log("seg-data", segmentData);
      } else {
        segmentData = ctx.dispatch("fetchPackage", segmentId).then(pkg => {
          console.log("seg-id", segmentId);
          segmentId = ctx.getters.getFirstSegment().id;
          console.log("seg-id", segmentId);
          ctx.dispatch("setCurrentSegmentSetup", segmentId);
          return pkg
        });
      }
      if (segmentData) ctx.commit("SET_CURRENT_SEGMENT_SETUP", segmentData);
      return segmentId;
    }
  },
  getters: {
    getFirstSegment: ctx => {
      return (
        ctx.currentCourse?.playSections.find(({ sectionTitle }) => "Segments")
          .segments[0] || null
      );
    },
    getSegmentById: (ctx, segmentId) =>
      ctx.state?.playSections[0].segments.filter(
        itm => itm.id === segmentId
      )[0],
    getHistory: ctx => {
      const histLength = ctx.courseHistory.length;
      if (histLength === 0) return [];
      const numCourses = histLength < 5 ? histLength : 5;
      return ctx.courseHistory.slice(numCourses, -1);
    },
    getPlaySections: ctx => {
      return ctx.playSections;
    }
  }
};
