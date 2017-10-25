<template>
  <div id="pano-container">
    <a-scene
      ref="sceneEl"
      @click="onSceneClick($event)"
      @enter-vr="handleEnterVR()"
      @exit-vr="handleExitVR()"
      :vr-mode-ui="scene.vrModeUi"
      :cursor="scene.cursor"
      inspector
      stats>
      <a-sky
        :src="panoramaImage">
      </a-sky>
      <pano-camera>
      </pano-camera>
      <pano-markers></pano-markers>
    </a-scene>
  </div>
</template>

<script>
/* eslint-disable */
import AFRAME from 'aframe'
import { mapGetters, mapActions } from 'vuex'

import PanoMarkers from '@/components/PanoMarkers'
import PanoCamera from '@/components/PanoCamera'

import panoramaImage from '@/assets/panorama1.jpg'
/* eslint-enable */

export default {
  name: 'PanoContainer',

  components: {
    PanoMarkers,
    PanoCamera
  },

  data () {
    return {
      // isUsingVRMode: false,
      panoramaImage: panoramaImage,
      scene: {
        vrModeUi: 'enabled: true',
        cursor: 'rayOrigin: mouse'
      }
    }
  },

  computed: {
    ...mapGetters([
      'isUsingVRMode'
    ])
  },

  methods: {
    ...mapActions([
      'setIsUsingVRMode'
    ]),

    onSceneClick (e) {
      // console.log('click scene: ', e)
    },

    handleEnterVR () {
      // console.log(this.$parent.$refs.scene.scene.enterVR())
      // this.$refs.scene.enterVR()
      this.setIsUsingVRMode(true)
    },

    handleExitVR () {
      this.setIsUsingVRMode(false)
    }
  }
}
</script>

<style lang="stylus" scoped>
#pano-container {
  height: 100vh
}
</style>
