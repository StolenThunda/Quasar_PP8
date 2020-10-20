<template >
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
                @click="playing = !playing"
                id="playback-play"
                class="transport-button"
                title="Toggle Playback."
              >
                <i v-show="!playing" class="fa fa-play" disabled></i>
                <i v-show="playing" class="fa fa-pause" disabled></i>
              </button>
            </li>
            <li class="">
              <button
                id="playback-beginning"
                class="transport-button"
                onClick="onButtonPlaybackRestart()"
                
                title="Back to the beginning."
              >
                <i class="fa fa-fast-backward" ></i>
              </button>
            </li>
            <li class="">
              <button
                id="playback-rewind"
                class="transport-button"
                onClick="onButtonPlaybackRewind5()"
                
                title="Rewind 5 Seconds."
              >
                <i class="fa fa-backward"></i> <sup>5</sup>
              </button>
            </li>
            <li class="">
              <button
                id="playback-forward"
                class="transport-button"
                onClick="onButtonPlaybackForward5()"
                
                title="Forward 5 Seconds."
              >
                <i class="fa fa-forward"></i> <sup>5</sup>
              </button>
            </li>
            <li class="">
              <button
                id="looping-start"
                class="transport-button"
                onClick="onButtonSetLoopStart();"
                
                title="Set loop starting point."
              >
                [ A
              </button>
            </li>
            <li class="">
              <button
                id="looping-stop"
                class="transport-button"
                onClick="onButtonSetLoopEnd();"
                
                title="Set loop stopping point."
              >
                B ]
              </button>
            </li>
            <li class="">
              <button
                id="looping-toggle"
                class="transport-button"
                onClick="onButtonToggleLooping()"
                
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
                onClick="toggleVideoControls()"
              >
                <q-icon name="mdi-cog"></q-icon>
              </button>
            </li>
          </ul>
        </div>
      </div>
</template>

<script>
  export default {
    name: 'PlayerControls',
    props: ['player'],
    data: () => ({ playing: false }),
    watch: {
      playing(value) {
        // debugger
      if (value) {
        return this.$emit('player-play');
      }
      return this.$emit('player-pause');
    },
    mounted() {
      // this.$q.notify({message: "controls mounted"});
      // console.log('controls mounted')
    }
    }
    
  }
</script>

<style lang="scss" scoped>
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
