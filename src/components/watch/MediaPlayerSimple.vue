<template>
  <q-page class="no-scroll">
    <div v-if="media" class="container">
      <!-- {{ media.mediaType }} -->
      <vue-plyr v-if="media.mediaType == 'vimeo'" class="no-margin full-height">
        <video controls crossorigin playsinline data-poster="media.thumbnail">
          <source
            v-for="(source, i) in media.videoSources"
            :key="i"
            :size="source.resolution"
            :src="source.url"
            type="video/mp4"
          />
        </video>
      </vue-plyr>
      <vue-plyr ref="plyr" v-if="media.mediaType == 'youtube'">
        <div
          data-plyr-provider="youtube"
          :data-plyr-embed-id="media.data"
        ></div>
      </vue-plyr>
      <div v-else>
        no yt data
      </div>
      <q-resize-observer @resize="onResize" />
    </div>
     <player-controls
    >
      <!-- :currentTime="ctime"
      :isPlaying="playing"
      :isLoopDefined="validLoop"
      :loopStart="loopStart"
      :loopStop="loopStop" -->
      <template #slider>
        <media-progress-slider /> <!--:remaining="duration" :ctime="ctime" :activeLoop="loopObj" />-->
      </template>
    </player-controls>
  </q-page>
</template>

<script>
import MediaProgressSlider from "components/watch/MediaProgressSlider.vue"
import PlayerControls from "components/watch/PlayerControls.vue"
import { mapActions, mapState } from "vuex"
export default {
  name: "MediaPlayerWrapper",
  data: () => ({
    media: null
  }),
  components: {
    MediaProgressSlider,
    PlayerControls
  },
  mounted() {
    // console.log('get it')
    this.media = this.fetchPackage(this.$route.params.packageID).then(
      () => this.fetchDefaultMedia(),
      error => {
        console.error("Something ain't right");
      }
    );
  },
  computed: {
    ...mapState("watch", ["currentSetup"])
  },
  watch: {
    currentSetup() {
      this.media = this.currentSetup;
    }
  },
  methods: {
    onResize(size) {
      console.error(size);
    },
    ...mapActions("watch", ["fetchPackage", "fetchDefaultMedia"])
  }
};
</script>

<style>
#mediaWrapper {
  position: absolute;
  top: 2.75rem;
  left: 0;
  right: 0;
  bottom: 0;
}

#mediaPlayerWrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 7.5rem;
  background: black;
  overflow: hidden;
  border: none;
  padding: 0;
  margin: 0;
}

.media-content-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  bottom: 0;
  padding: 1rem;
  background: #222;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

#mediaPlayerWrapper.no-controls {
  top: 2.5rem;
  bottom: 0 !important;
}
#mediaPlayerWrapper iframe,
#mediaWrapper iframe#ssembed {
  width: 100%;
  height: 100%;
}

#zoomIndicator {
  position: absolute;
  border: 5px solid #0099ff;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  pointer-events: none;
  display: none;
}

#mediaPlayerWrapper.zoomed #zoomIndicator {
  display: inherit;
}

#mediaPlayerWrapper video {
  height: 100%;
}
#proPlayerWrapper #content-frame {
  position: absolute;
  top: 2.5rem;
  left: 0;
  width: 100%;
  bottom: 0;
  height: 100%;
}

/*****************************************
*************  Video Page   ************
*****************************************/

#mediaPanZoomWrapper {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  padding: 0;
  margin: 0;
}

#mediaControlsWrapper {
  position: absolute;
  bottom: 0;
  height: auto;
  width: 100%;
  background: #555;
  border-top: 1px solid #777;
}

#transportButtonsWrapper {
  float: left;
  width: 100%;
  background: linear-gradient(
    to bottom,
    rgba(40, 40, 40, 1) 0%,
    rgba(50, 50, 50, 1) 100%
  );
  z-index: 100;
  padding-top: 0.25em;
  padding-bottom: 0.25em;
}

ul#transportButtonsList {
  float: left;
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
}
ul#transportButtonsList li {
  width: 25%;
  float: left;
  padding: 0.1rem;
}
/*****************************************
*************   Player Timeline  ************
*****************************************/

#current-time,
#time-left {
  margin-top: -2rem;
  font-size: 0.7rem;
  font-family: Arial;
  font-weight: bold;
}
#current-time {
  float: left;
  margin-left: 0.5rem;
}
#time-left {
  float: right;
  margin-right: 0.5rem;
}

/*****************************************
*************   Transport  ************
*****************************************/
#loop-display-wrapper {
  float: left;
  width: 100%;
  background: #222;
}
.transport-button {
  width: 100%;
  line-height: 2.5em;
  background: none;
  border: none;
  font-size: 1rem;
  -webkit-font-smoothing: antialiased;
  color: white;
  text-align: center;
  font-weight: 600;
  background: rgb(86, 86, 86);
  background: -moz-linear-gradient(
    top,
    rgba(86, 86, 86, 1) 0%,
    rgba(51, 51, 51, 1) 100%
  );
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, rgba(86, 86, 86, 1)),
    color-stop(100%, rgba(51, 51, 51, 1))
  );
  background: -webkit-linear-gradient(
    top,
    rgba(86, 86, 86, 1) 0%,
    rgba(51, 51, 51, 1) 100%
  );
  background: linear-gradient(
    to bottom,
    rgba(86, 86, 86, 1) 0%,
    rgba(51, 51, 51, 1) 100%
  );
  white-space: nowrap;
  border-radius: 3px;
  box-shadow: 0px 0px 3px #111;
}

.transport-button.set,
.transport-button.set:hover {
  color: lime;
}

.transport-button:hover {
  color: white;
  background: rgb(117, 117, 117);
  background: -moz-linear-gradient(
    top,
    rgba(117, 117, 117, 1) 0%,
    rgba(66, 66, 66, 1) 100%
  );
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, rgba(117, 117, 117, 1)),
    color-stop(100%, rgba(66, 66, 66, 1))
  );
  background: -webkit-linear-gradient(
    top,
    rgba(117, 117, 117, 1) 0%,
    rgba(66, 66, 66, 1) 100%
  );
  background: -o-linear-gradient(
    top,
    rgba(117, 117, 117, 1) 0%,
    rgba(66, 66, 66, 1) 100%
  );
  background: -ms-linear-gradient(
    top,
    rgba(117, 117, 117, 1) 0%,
    rgba(66, 66, 66, 1) 100%
  );
  background: linear-gradient(
    to bottom,
    rgba(117, 117, 117, 1) 0%,
    rgba(66, 66, 66, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#757575', endColorstr='#424242',GradientType=0 );
}
.transport-button:focus {
  outline: none;
}
.transport-button:active {
  background: #111;
  border-color: #777;
}
.transport-button.disabled,
.transport-button:disabled {
  pointer-events: none;
  background: #444;
  color: #606060;
  border-color: #777;
}

.transport-button.engaged {
  background: rgb(204, 108, 108);
  background: -moz-linear-gradient(
    top,
    rgba(204, 108, 108, 1) 0%,
    rgba(204, 0, 0, 1) 100%
  );
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, rgba(204, 108, 108, 1)),
    color-stop(100%, rgba(204, 0, 0, 1))
  );
  background: -webkit-linear-gradient(
    top,
    rgba(204, 108, 108, 1) 0%,
    rgba(204, 0, 0, 1) 100%
  );
  background: -o-linear-gradient(
    top,
    rgba(204, 108, 108, 1) 0%,
    rgba(204, 0, 0, 1) 100%
  );
  background: -ms-linear-gradient(
    top,
    rgba(204, 108, 108, 1) 0%,
    rgba(204, 0, 0, 1) 100%
  );
  background: linear-gradient(
    to bottom,
    rgba(204, 108, 108, 1) 0%,
    rgba(204, 0, 0, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#cc6c6c', endColorstr='#cc0000',GradientType=0 );
}

button.control-button {
  width: 100%;
  background: none;
  border: none;
  color: #ccc;
  outline: none;
  font-size: 1.2rem;
}

button.control-button:hover {
  color: white;
}

.form-button:disabled {
  background: #555;
  color: #777;
}

#playback-play.transport-button {
  background: #5dcc94;
  background: -moz-linear-gradient(top, #5dcc94 0%, #02cc67 100%);
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, #5dcc94),
    color-stop(100%, #02cc67)
  );
  background: -webkit-linear-gradient(top, #5dcc94 0%, #02cc67 100%);
  background: -o-linear-gradient(top, #5dcc94 0%, #02cc67 100%);
  background: -ms-linear-gradient(top, #5dcc94 0%, #02cc67 100%);
  background: linear-gradient(to bottom, #5dcc94 0%, #02cc67 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#5dcc94', endColorstr='#02cc67',GradientType=0 );
  border-color: transparent;
}

/*****************************************
*********   Progress And Looping  ********
*****************************************/

div#playhead {
  background: white;
  position: absolute;
  height: 0.75rem;
  width: 0.75rem;
  top: 0.125rem;
  border-radius: 0.5em;
  margin-left: -0.25em;
}

#loop-display {
  float: left;
  width: 100%;
  height: 1rem;
  background: #333;
  cursor: pointer;
}

#loop-region {
  display: block;
  margin-bottom: -1rem;
  background: #777;
  height: 100%;
  position: absolute;
}

#progressSlider {
  margin: 0 1rem;
  font-size: 1.5rem;
  box-sizing: content-box;
}

#progressSlider.looping {
}

#progressSlider.looping #loop-region {
  background: white;
}

#progressSlider.looping .noUi-handle {
  background: #0099ff;
  opacity: 0.8;
}

/*****************************************
*************   Chapter Markers  ************
*****************************************/

#chapters-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
}

.chapter-marker {
  position: absolute;
  width: 1px;
  height: 100%;
  border-left: 1px solid #555;
}
/*****************************************
*************   Settings Panel  ************
*****************************************/
#videoControlsMenu {
  line-height: 1rem;
  color: white;
  position: absolute;
  text-align: left;
  display: none;
  top: 0;
  bottom: 3rem;
  background: #222;
  right: 0;
  width: 300px;
  color: #ccc;
  border: 1px solid #555;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  font-size: 0.9rem;
  z-index: 2;
}

#videoControlsMenu .widget-inner {
  margin: 1rem 0;
}

#videoControlsMenu .widgetTitle {
  font-size: 0.7rem;
  font-weight: bold;
  color: white;
  margin-bottom: 0.75rem;
  margin-top: 0 !important;
}

#videoControlsMenu ul.widget-list {
  padding: 0;
  color: #bbb;
  margin: 0;
  list-style: none;
}

#videoControlsMenu ul.widget-list li {
  border-bottom: 1px solid #555;
}

#videoControlsMenu ul.widget-list li a {
  line-height: 1.8em;
  font-size: 0.8rem !important;
  font-weight: 600;
  padding: 0;
  margin: 0;
}

#videoControlsMenu ul.widget-list li.selected a {
  background: white;
  color: #222;
}

#videoControlsMenu .widget-section {
  margin-bottom: 0.75rem;
}

.widget-column-heading {
  white-space: nowrap;
  font-family: Oswald, "Lucida Sans Unicode", "Lucida Grande", Helvetica, Arial,
    sans-serif;
  letter-spacing: 0.03em;
  font-size: 1rem;
  text-transform: uppercase;
  font-size: 0.9em;
  font-weight: 900;
  line-height: 1em;
  margin-bottom: 0.25rem;
  color: white;
}
.widget-column-heading .slider-indicator {
  display: inline-block;
  margin-left: 0.25rem;
  color: #999;
}
.slider-unity-indicator {
  width: 1px;
  background: #ccc;
  z-index: 1;
  position: absolute;
  top: 2px;
  bottom: 2px;
  pointer-events: none;
}

.slider-unity-indicator.vimeo {
  left: 58.1%;
}

.slider-unity-indicator.youtube {
  left: 60%;
}

.widget-column-heading.list-heading {
  border-bottom: 1px solid #555;
  padding-bottom: 0.25rem;
}

.small-text-center {
  text-align: center;
}

.small-text-right {
  text-align: right;
}

.small-text-left {
  text-align: left;
}
</style>
