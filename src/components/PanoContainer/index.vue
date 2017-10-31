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
        <img
          v-for="panorama in panoramas"
          :key="panorama.id"
          :src="panorama.imageSrc">
        <img id="tag" :src="tagImage">
        <img id="point" :src="pointImage">
      </a-assets>
      <a-sky :src="selectedPanorama.imageSrc"></a-sky>
      <pano-camera></pano-camera>
      <pano-markers></pano-markers>
    </a-scene>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import PanoMarkers from '@/components/PanoContainer/PanoMarkers'
import PanoCamera from '@/components/PanoContainer/PanoCamera'

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
      tagImage: tagImage,
      pointImage: pointImage,
      scene: {
        vrModeUi: 'enabled: false',
        cursor: 'rayOrigin: mouse'
      }
    }
  },

  computed: {
    ...mapGetters([
      'panoramas',
      'selectedPanorama',
      'isUsingVRMode'
    ])
  },

  methods: {
    ...mapActions([
      'setSelectedPanorama',
      'setIsUsingVRMode',
      'setIsModalShow'
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
      this.setIsModalShow(false)
    }
  },

  beforeMount () {
    this.setSelectedPanorama(this.panoramas[0])
  }
}
</script>

<style lang="stylus" scoped>
#pano-container {
  position: relative
  height: 100vh
  z-index: 1
}
</style>
