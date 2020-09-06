<template>
<div id="mediaWrapper">
  <q-page id="mediaPlayerWrapper" v-model="currentSetup">
    <div
      v-if="currentSetup?.type == 'pdf'"
      id="video-player-wrapper"
      class="no-controls"
    >
    <div id="video-player-wrapper" class="no-controls">

      <iframe
        width="1000"
        height="800"
        :src="currentSetup?.src"
        frameborder="0"
        allowfullscreen
      ></iframe>
      </div>
    </div>
    <div v-if="currentSetup?.type == 'soundslice'">
      <iframe
        id="ssembed"
        :src="
          `https://www.soundslice.com/scores/${currentSetup?.src}/embed/?api=1&show_title=0&branding=2`
        "
        width="100%"
        height="800px"
        frameBorder="0"
      ></iframe>
    </div>
    <media-player v-model="currentSetup" v-else />

    <!-- Player Controls -->
    <div id="mediaControlsWrapper">
      <div id="progressSliderWrapper">
        <div id="current-time">0.00</div>
        <div id="time-left"></div>
        <div id="progressSlider">
          <div id="loop-region" style="display: none"></div>
          <div id="chapters-wrapper"></div>
        </div>
      </div>

      <div id="transportButtonsWrapper">
        <ul id="transportButtonsList">
          <li>
            <button
              id="playback-play"
              class="transport-button"
              onClick="thePlayer.theEngine.onButtonTogglePlayback();"
              disabled
              title="Toggle Playback."
            >
              <i class="fa fa-play" disabled></i>
            </button>
          </li>
          <li class="">
            <button
              id="playback-beginning"
              class="transport-button"
              onClick="thePlayer.theEngine.onButtonPlaybackRestart();"
              disabled
              title="Back to the beginning."
            >
              <i class="fa fa-fast-backward" disabled></i>
            </button>
          </li>
          <li class="">
            <button
              id="playback-rewind"
              class="transport-button"
              onClick="thePlayer.theEngine.onButtonPlaybackRewind5();"
              disabled
              title="Rewind 5 Seconds."
            >
              <i class="fa fa-backward"></i> <sup>5</sup>
            </button>
          </li>
          <li class="">
            <button
              id="playback-forward"
              class="transport-button"
              onClick="thePlayer.theEngine.onButtonPlaybackForward5();"
              disabled
              title="Forward 5 Seconds."
            >
              <i class="fa fa-forward"></i> <sup>5</sup>
            </button>
          </li>
          <li class="">
            <button
              id="looping-start"
              class="transport-button"
              onClick="thePlayer.theEngine.onButtonSetLoopStart();"
              disabled
              title="Set loop starting point."
            >
              [ A
            </button>
          </li>
          <li class="">
            <button
              id="looping-stop"
              class="transport-button"
              onClick="thePlayer.theEngine.onButtonSetLoopEnd();"
              disabled
              title="Set loop stopping point."
            >
              B ]
            </button>
          </li>
          <li class="">
            <button
              id="looping-toggle"
              class="transport-button"
              onClick="thePlayer.theEngine.onButtonToggleLooping()"
              disabled
              title="Begin/End Looping."
            >
              <i class="fa fa-refresh"></i><i class="fa fa-play"></i>
            </button>
          </li>
          <li>
            <button
              id="controls-toggle"
              class="transport-button"
              title="Video Settings."
              onClick="thePlayer.theEngine.toggleVideoControls();"
            >
              <i class="fa fa-gear"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </q-page>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MediaContentPlayerWrapper",
  components: {
    "media-player": () => import("components/watch/MediaPlayer")
  },
  computed: {
    ...mapState("watch", ["currentSetup"])
  }
};
</script>

<style lang="stylus" scoped>
#mediaWrapper {
  position: absolute;
  top: 2.75rem;
  left: 0;
  right: 0;
  bottom: 0;
}
#mediaPlayerWrapper {
  bottom: 4.9rem;
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
  background: linear-gradient(to bottom, rgba(40,40,40,1) 0%,rgba(50,50,50,1) 100%);
  z-index: 100;
  padding-top: .25em;
  padding-bottom: .25em;
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
  padding: .1rem;
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
  background: rgb(86,86,86);
  background: -moz-linear-gradient(top, rgba(86,86,86,1) 0%, rgba(51,51,51,1) 100%);
  background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(86,86,86,1)), color-stop(100%,rgba(51,51,51,1)));
  background: -webkit-linear-gradient(top, rgba(86,86,86,1) 0%,rgba(51,51,51,1) 100%);
  background: linear-gradient(to bottom, rgba(86,86,86,1) 0%,rgba(51,51,51,1) 100%);
  white-space: nowrap;
  border-radius: 3px;
  box-shadow: 0px 0px 3px #111;
}
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
  font-size: .9rem;
  z-index: 2;
}
ul#transportButtonsList li {
  width: 12.5%;
}
</style>
