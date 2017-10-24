<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <router-view/> -->
    <!-- <div class="aframe-container"> -->
      <a-scene
        @click="onSceneClick($event)"
        cursor="rayOrigin: mouse"
        inspector
        stats>
        <a-sky
          :src="panoramaImage">
        </a-sky>
        <a-camera
          position="0 0 0"
          reverse-mouse-drag="true"
          @componentchanged="onCameraChange($event)">
        </a-camera>
        <a-entity>
          <a-image
            :src="tagImage"
            width="1"
            height="1"
            :opacity="initialOpacity"
            color="#fff"
            position="-2.5 0.25 -1.5"
            @click="onMarkerClick($event)"
            @mouseenter="onMarkerMouseenter($event)"
            @mouseleave="onMarkerMouseleave($event)"
            transparent="true">
            <a-animation
              attribute="scale"
              from=".8 .8 1"
              to="1 1 1"
              dur="1500"
              fill="both"
              repeat="indefinite">
            </a-animation>
          </a-image>
        </a-entity>
        <!-- <a-text
          font="kelsonsans"
          value="Puy de Sancy, France"
          width="6"
          position="-2.5 0.25 -1.5"
          rotation="0 15 0"
        >
        </a-text> -->
      </a-scene>
    <!-- </div> -->
  </div>
</template>

<script>
/* eslint-disable */
import AFRAME from 'aframe'
/* eslint-enable */

export default {
  name: 'app',

  data () {
    return {
      panoramaImage: require('./assets/1.jpg'),
      tagImage: require('./assets/tag.png'),
      initialOpacity: '.6',
      activeOpacity: '.8'
    }
  },

  mounted () {

  },

  methods: {
    onSceneClick (e) {
      console.log('click scene: ', e)
    },

    onMarkerClick (e) {
      console.log('click marker: ', e)
    },

    onMarkerMouseenter (e) {
      console.log('mouse enter')
      e.currentTarget.setAttribute('opacity', this.activeOpacity)
    },

    onMarkerMouseleave (e) {
      console.log('mouse leave')
      e.currentTarget.setAttribute('opacity', this.initialOpacity)
    },

    onCameraChange (e) {
      console.log('camera change: ', e)
    }
  }
}
</script>

<style lang="stylus" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  height: 100%

  .aframe-container {
    // width: 50vw
    // height: 100vh
    // overflow: hidden
  }
}
</style>
