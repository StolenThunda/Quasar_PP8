import Vue from "vue";
import { ProPlayer } from "../../middleware/ProPlayerCore";
export default {
  namespaced: true,
  state: {
    currentCourse: null,
    ProPlayer: new ProPlayer(),
    // currentPackage: new Package(),
    // currentSegment: new Segment(),
    currentSetup: { sources: null },
    currentUserLoops: null,
    sections: null,
    courseHistory: [],
    seekToTime: 0,
    ProPlayer: new ProPlayer(),
    playerSettings: {
      speed: null,
      volume: null,
      zoomEnabled: false,
      zoom: 1,
      flipped: false
    },
    playerOpts: {
      controls: false
    }
    // loopManager: this.ProPlayer.loopManager,
    // commentManager: new CommentsManager(),
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
      console.log("currentCourse", data);
      if (ctx.currentCourse !== null) {
        // if (ctx.courseHistory.length > 4) ctx.courseHistory.shift();
        ctx.courseHistory.push(ctx.currentCourse);

        //     //TODO: Ensure no duplicates in courseHistory

        //     // console.log("pushed", ctx.courseHistory);
        //     // const pushed = ctx.courseHistory.reduce((acc, current) => {
        //     //   const x = acc.find(item => item.segmentEntryID === current.segmentEntryID);
        //     //   if(!x) {
        //     //     return acc.concat([current])
        //     //   }else{
        //     //     return acc
        //     //   }
        //     // }, [])
        //     // Vue.set(ctx, "courseHistory", pushed); // to remove duplicates from array
        //     // console.log("noDups", ctx.courseHistory);
        //   }
        //   ctx.currentCourse = data;
        //   // map course to state
        //   for (let [k, v] of Object.entries(data)) {
        //     Vue.set(ctx, k, v);
      }
    },
    SET_USER_LOOP_DATA(ctx, data) {
      console.log("Setting user Loops", data);
      ctx.currentUserLoops = JSON.parse(JSON.stringify(data));
    },
    SET_CURRENT_PACKAGE(ctx, packageData) {
      if (packageData.packageError === "") {
        ctx.ProPlayer.thePackage
          .setEntryID(packageData.packageID)
          .setTitle(packageData.packageTitle)
          .setChannelName(packageData.packageChannel)
          .setChannelShortName(packageData.packageChannelSlug)
          .setDate(packageData.packageDate)
          .setDefaultSegmentEntryID(packageData.packageDefaultSegmentID)
          .setDescription(packageData.packageDescription)
          .setOverview(packageData.packageOverview)
          .setImageURL(packageData.packageImage)
          .setSections(packageData.sections)
          .setTuning(packageData.packageTuning)
          .setLoaded(true);
        ctx.ProPlayer.bPackageDataLoadingFinished = true;
      } else {
        ctx.ProPlayer.thePackage
          .setLoaded(false)
          .setErrorMessage(packageData.packageError);
      }
    },
    SET_CURRENT_SEGMENT(ctx, segmentData) {
      console.log("CurrentSegment", segmentData);
      ctx.ProPlayer.theSegment
        .setEntryID(segmentData.segmentEntryID)
        .setSegmentType("entry")
        .setVimeoCode(segmentData.segmentVimeoCode)
        .setYouTubeCode(segmentData.segmentYouTubeCode)
        .setMP3Filename(segmentData.segmentMP3Filename)
        .setSoundSliceCode(segmentData.segmentSoundSliceCode)
        .setPDFFilename(segmentData.segmentPDFFilename)
        .setMediaURL(segmentData.segmentURL)
        .setGPXFilename(segmentData.segmentGPXFilename)
        .setTitle(segmentData.segmentTitle)
        .setDisplayName(segmentData.segmentDisplayName)
        .setFullDisplayName(segmentData.segmentFullDisplayName)
        .setChaptersArray(segmentData.chaptersArray)
        .setLoopsArray(segmentData.loopsArray)
        .setMediaStartTime(segmentData.mediaStartTime)
        .setHTMLContent(segmentData.segmentHTML)
        .setDescription(segmentData.segmentShortDescription)
        .setUserLoopsEntryIDsFromString(segmentData.userLoopEntryIDs)
        ?.setIsLoaded(true)
        .inferMediaType();
      ctx.ProPlayer.bSegmentDataLoadingFinished = true;
    },
    SET_CURRENT_SEGMENT_SETUP(ctx, data) {
      ctx.currentSetup = Object.assign({}, ctx.playerOpts, data);
    },
    SET_SEEK_TIME(ctx, data) {
      ctx.seekToTime = data
    },
    SET_LOOP_SELECTED(ctx, {nCollectionID, nListIndex, nLoopIndex}){
      ctx.loopManager.loopSelected(nCollectionID, nListIndex, nLoopIndex)
    }
  },
  actions: {
    setLoopSelected({commit}, data) {
      commit('SET_LOOP_SELECTED', data)
    },
    flipPlayer({ commit }, bool) {
      commit("FLIP_PLAYER");
    },
    setSeekToTime({commit}, time){
      commit('SET_SEEK_TIME', time)
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
          ctx.commit("SET_USER_LOOP_DATA", loopData);
          return loopData;
        });
    },
    fetchUserLoops: (ctx, ID) => ctx.dispatch("fetchUserLoopData", ID),
    fetchPackage: (ctx, ID) => ctx.dispatch("fetchPackageData", ID),
    async fetchPackageData(ctx, ID) {
      return await ctx.rootState.TXBA_UTILS.getPackage(ID)
        // .then(packageData => {
        // console.log("PackageData", packageData);
        //   return packageData;
        // })
        // .then(packageData => {
        //   ctx.commit("SET_CURRENT_COURSE", packageData);
        //   return packageData;
        // })
        .then(packageData => {
          ctx.commit("SET_CURRENT_PACKAGE", packageData);
          return packageData;
        })
        .then(() => {
          const defaultSegmentID = ctx.state.ProPlayer.thePackage.getDefaultSegmentEntryID();
          if (defaultSegmentID) {
            ctx.dispatch("fetchSegment", defaultSegmentID).then(() => {
              ctx.ProPlayer.processBothNewPackageAndSegmentData();
            });
          }
        })
        .then();
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
          return pkg;
        });
      }
      if (segmentData) ctx.commit("SET_CURRENT_SEGMENT_SETUP", segmentData);
      return segmentId;
    },
    openSegment(ctx, ID) {
      ctx.dispatch("fetchSegment", ID).then(() => {
        ctx.state.ProPlayer.processOnlyNewSegmentData();
      });
      return ID
    }
  },
  getters: {
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
