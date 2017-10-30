<template>
  <div id="pano-container">
    <a-scene
      ref="sceneEl"
      @click="onSceneClick($event)"
      @enter-vr="handleEnterVR()"
      @exit-vr="handleExitVR()"
      @loaded="onResourceLoaded()"
      :vr-mode-ui="scene.vrModeUi"
      :cursor="scene.cursor"
      inspector
      stats>
      <a-assets>
        <img id="panorama" :src="panoramaImage">
        <img id="tag" :src="tagImage">
        <img id="point" :src="pointImage">
      </a-assets>
      <a-sky src="#panorama"></a-sky>
      <pano-camera></pano-camera>
      <pano-markers></pano-markers>
    </a-scene>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import PanoMarkers from '@/components/PanoContainer/PanoMarkers'
import PanoCamera from '@/components/PanoContainer/PanoCamera'

import panoramaImage from '@/assets/panorama1.jpg'
import tagImage from '@/assets/tag.png'
import pointImage from '@/assets/point.png'

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
      tagImage: tagImage,
      pointImage: pointImage,
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
      'setIsUsingVRMode',
      'setShouldModalShow'
    ]),

    onResourceLoaded () {
      console.log('loaded')
    },

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
      this.setShouldModalShow(false)
    }
  }
}
</script>

<style lang="stylus" scoped>
#pano-container {
  height: 100vh
}
</style>
