import Vue from "vue";
import { ProPlayer } from "../../middleware/ProPlayerCore";
export default {
  namespaced: true,
  state: {
    currentCourse: null,
    ProPlayer: new ProPlayer(),
    currentSetup: { sources: null },
    userLoops: null,
    sections: null,
    courseHistory: [],
    seekToTime: 0,
    mediaSources: null,
    playerSettings: {
      speed: 1,
      volume: 0.5,
      zoomEnabled: false,
      zoom: 1,
      flipped: false
    },
    playerOpts: {
      controls: false
    },
    playSections: []
  },
  mutations: {
    FLIP_PLAYER ( ctx ) {
      console.log( "b4", ctx.playerSettings.flipped );
      ctx.playerSettings.flipped = !ctx.playerSettings.flipped;
      console.log( "aft", ctx.playerSettings.flipped );
    },
    LOAD_PLAYER_SETTINGS ( ctx, objSettings ) {
      Vue.set(
        ctx,
        "playerSettings",
        Object.assign( {}, ctx.playerSettings, objSettings )
      );
    },
    SET_CURRENT_COURSE ( ctx, data ) {
      if ( !data ) return;
      console.log( "currentCourse", data );
      if ( ctx.currentCourse !== null ) {
        // if (ctx.courseHistory.length > 4) ctx.courseHistory.shift();
        ctx.courseHistory.push( ctx.currentCourse );

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
    SET_USER_LOOP_DATA ( ctx, data ) {
      console.log( "Setting user Loops", data );
      ctx.userLoops = JSON.parse( JSON.stringify( data ) );
    },
    SET_CURRENT_PACKAGE ( ctx, packageData ) {
      if ( packageData.packageError === "" ) {
        ctx.ProPlayer.thePackage
          .setEntryID( packageData.packageID )
          .setTitle( packageData.packageTitle )
          .setChannelName( packageData.packageChannel )
          .setChannelShortName( packageData.packageChannelSlug )
          .setDate( packageData.packageDate )
          .setDefaultSegmentEntryID( packageData.packageDefaultSegmentID )
          .setDescription( packageData.packageDescription )
          .setOverview( packageData.packageOverview )
          .setImageURL( packageData.packageImage )
          .setSections( packageData.sections )
          .setTuning( packageData.packageTuning )
          .setLoaded( true );
        ctx.ProPlayer.bPackageDataLoadingFinished = true;
      } else {
        ctx.ProPlayer.thePackage
          .setLoaded( false )
          .setErrorMessage( packageData.packageError );
      }
    },
    SET_CURRENT_SEGMENT ( ctx, segmentData ) {
      // console.log("CurrentSegment", segmentData);
      ctx.ProPlayer.theSegment
        .setEntryID( segmentData.segmentEntryID )
        .setSegmentType( "entry" )
        .setVimeoCode( segmentData.segmentVimeoCode )
        .setYouTubeCode( segmentData.segmentYouTubeCode )
        .setMP3Filename( segmentData.segmentMP3Filename )
        .setSoundSliceCode( segmentData.segmentSoundSliceCode )
        .setPDFFilename( segmentData.segmentPDFFilename )
        .setMediaURL( segmentData.segmentURL )
        .setGPXFilename( segmentData.segmentGPXFilename )
        .setTitle( segmentData.segmentTitle )
        .setDisplayName( segmentData.segmentDisplayName )
        .setFullDisplayName( segmentData.segmentFullDisplayName )
        .setChaptersArray( segmentData.chaptersArray )
        .setLoopsArray( segmentData.loopsArray )
        .setMediaStartTime( segmentData.mediaStartTime )
        .setHTMLContent( segmentData.segmentHTML )
        .setDescription( segmentData.segmentShortDescription )
        .setUserLoopsEntryIDsFromString( segmentData.userLoopEntryIDs )
        .setIsLoaded( true )
        .inferMediaType();
      ctx.ProPlayer.bSegmentDataLoadingFinished = true;
    },
    SET_CURRENT_SEGMENT_SETUP ( ctx, data ) {
      console.log( "currentSetup", ctx.currentSetup );
      console.log( "playerOpts", ctx.playerOpts );
      console.log( "playerSettings", ctx.playerSettings );
      console.log( 'New data', data )
      ctx.currentSetup = Object.assign(
        {},
        ctx.currentSetup,
        ctx.playerOpts,
        ctx.playerSettings,
        data );
    },
    SET_PLAY_SECTIONS(ctx, data){
      ctx.playSections = data?.playSections
    },
    SET_SEEK_TIME ( ctx, data ) {
      ctx.seekToTime = data;
    },
    SET_MEDIA_SOURCES ( ctx, data ) {
      console.log( "media", typeof data );
      ctx.mediaSources = data;
    },
    SET_LOOP_SELECTED ( ctx, { nCollectionID, nListIndex, nLoopIndex } ) {
      ctx.loopManager.loopSelected( nCollectionID, nListIndex, nLoopIndex );
    }
  },
  actions: {
    setLoopSelected ( { commit }, data ) {
      commit( "SET_LOOP_SELECTED", data );
    },
    flipPlayer ( { commit }, bool ) {
      commit( "FLIP_PLAYER" );
    },
    setSeekToTime ( { commit }, time ) {
      commit( "SET_SEEK_TIME", time );
    },
    loadPlayerSettings ( { commit }, objSettings ) {
      commit( "LOAD_PLAYER_SETTINGS", objSettings );
    },
    fetchComments ( { dispatch }, pID ) {
      return dispatch( "fetchCommentsData", pID );
    },
    async fetchCommentsData ( ctx, pID ) {
      const comments = await ctx.rootState.TXBA_UTILS.getComments( pID, pID );
      // console.log('coms', comments)
      return comments;
    },
    async fetchUserLoopData ( ctx, ID ) {
      return await ctx.rootState.TXBA_UTILS.getUserLoops( ID )
        .then( loopData => {
          // handle malformed JSON
          if ( typeof loopData === 'object' ) return loopData
          return (
            JSON.parse(
              loopData.replaceAll(
                '"memberLoops": \n\t\t\t',
                '"memberLoops" : []'
              )
            ) || ""
          );
        } )
        .then( loopData => {
          ctx.commit( "SET_USER_LOOP_DATA", loopData );
          return loopData;
        } );
    },
    fetchUserLoops: ( ctx, ID ) => ctx.dispatch( "fetchUserLoopData", ID ),
    fetchPackage: ( { dispatch }, ID ) => {
      const newId = dispatch( "fetchPackageData", ID )
        .then( ( id ) => {
          const tabs = ['Loops', 'Chapters']
          dispatch( "removeSidebarTabs", tabs, { root: true } );
          return id
        } )
      return newId
    },
    async fetchPackageData ( ctx, ID ) {
      return await ctx.rootState.TXBA_UTILS.getPackage( ID ).then( packageData => {
        ctx.commit( "SET_CURRENT_PACKAGE", packageData );
        ctx.commit( "SET_PLAY_SECTIONS", packageData );
        
        return packageData;
      }, error => console.error( `Problem fetching package data, ${error}` ) );
    },
    fetchDefaultMedia: ctx => ctx.dispatch( "fetchMediaData", ctx.state.ProPlayer.thePackage.getDefaultSegmentEntryID() ),
    async fetchMediaData ( { dispatch }, segID ) {
      const response = await dispatch( "fetchSegment", segID )
        .then( id => dispatch("setCurrentSegmentSetup", id))
        .then( ID => dispatch( "fetchUserLoops", ID ) )
        .then( () => dispatch( "getMediaInfo"))
      return response
    },
    fetchSegment: ( { dispatch }, ID ) => {
      return dispatch( "fetchSegmentData", ID )
        .then( ( ID ) => {
          const loopTabs = [
            {
              name: "Loops",
              componentName: "InstantLoopsManager",
              icon: "mdi-sync",
              iconOnly: true,
              cmp: () => import( "components/watch/sidebar/LoopTab/InstantLoops" )
            },
            {
              name: "Chapters",
              componentName: "ChaptersManager",
              icon: "mdi-bookmark",
              iconOnly: true,
              cmp: () => import( "components/watch/sidebar/ChapterTab/Chapters" )
            }
          ];
          dispatch( "addSidebarTabs", loopTabs, { root: true } );
          return ID
        } );
    },
    async fetchSegmentData ( ctx, ID ) {
      const response = await ctx.rootState.TXBA_UTILS.getSegment( ID );
      console.log( "segData", response );
      ctx.commit( "SET_CURRENT_SEGMENT", response );
      return ID;
    },
    setCurrentSegmentSetup ( ctx, segmentId ) {
      var segmentData = null;
      if ( ctx.state.playSections ) {
        segmentData = ctx.state.playSections[0].segments.filter(
          itm => itm.id === segmentId
        )[0];
        console.log( "seg-data", segmentData );
      } else {
        segmentData = ctx.dispatch( "fetchPackage", segmentId ).then( pkg => {
          // console.log( "seg-id", segmentId );
          segmentId = ctx.getters.getFirstSegment().id;
          console.log( "seg-id", segmentId );
          ctx.dispatch( "setCurrentSegmentSetup", segmentId );
          return pkg;
        } );
      }
      console.log('segmentData', segmentData);
      if ( segmentData ) ctx.commit( "SET_CURRENT_SEGMENT_SETUP", segmentData );
      return segmentId;
    },
    openSegment ( ctx, ID ) {
      return ctx.dispatch( "fetchMedia" );
      // ctx.dispatch("fetchSegment", ID).then(() => {
      //   ctx.state.ProPlayer.processOnlyNewSegmentData();
      // });
      // return ID;
    },
    getMediaInfo ( ctx ) {
      let segment = ctx.state.ProPlayer.theSegment;
      let mediaType = segment.getPrimaryMediaType();
      let info = { 'mediaType': mediaType }
      let slug = "/--ajax-load-media";
      var data;
      console.log( mediaType, segment );
      switch ( mediaType ) {
        case "vimeo":
          data = segment.getVimeoCode()
          info.data = data
          slug += `/${mediaType}/${data}`;
          // this.mediaLoadVimeo();
          break;
        case "youtube":
          data = segment.getYouTubeCode()
          info.data = data
          slug += `/${mediaType}/${data}`;
          // this.mediaLoadYouTube(this.theS);
          break;
        case "mp3":
          data = segment.getMP3Filename()
          info.data = data
          slug += `/${mediaType}/${data}`;
          // this.mediaLoadMP3(this.theSegment.);
          break;
        case "soundslice":
          data = segment.getSoundSliceCode()
          info.data = data
          slug = `/--ajax-load-soundslice/${mediaType}/${data}`;
          // this.mediaLoadSoundSlice(this.the);
          break;
        case "pdf":
          slug = `/--ajax-load-pdf/${segment.getPDFFilename()}`;
          // this.mediaLoadPDFViewer(this.theS);
          break;
        case "url":
          return `<iframe id='content-frame' src='${decodeURIComponent(
            theURL
          )}' frameBorder='0'></iframe>`;

        case "facebook":
          this.mediaLoadFacebook(
            this.theSegment.getFacebookUser(),
            this.theSegment.getFacebookVideoCode()
          );
          break;
        case "instagram":
          slug += `/${mediaType}/${segment.getInstagramID()}`;

          // this.mediaLoadInstagram(this.theSegment.getInstagramID());
          break;
        case "html":
          return info
        //   return `<div class='media-content-wrapper'>${segment.getHTMLContent()}</div>`;
      }
      console.log( "loading Media", slug, info );

      // TODO: Fix hokey workaround
      ctx.commit( 'SET_CURRENT_SEGMENT_SETUP', info )
      return ctx.rootState.TXBA_UTILS.loadMedia( slug, info );
    }
  },
  getters: {
    getHistory: ctx => {
      const histLength = ctx.courseHistory.length;
      if ( histLength === 0 ) return [];
      const numCourses = histLength < 5 ? histLength : 5;
      return ctx.courseHistory.slice( numCourses, -1 );
    },
    getPlaySections: ctx => {
      return ctx.playSections;
    },
    hasDefaultSegment: ctx =>
      ctx.ProPlayer.thePackage.getDefaultSegmentEntryID() !== ""
  }
};
