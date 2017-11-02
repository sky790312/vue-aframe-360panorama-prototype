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
        <img :src="tagImage">
        <img :src="pointImage">
      </a-assets>
      <a-sky :src="currentPanorama.imageSrc"></a-sky>
      <pano-camera></pano-camera>
      <v-tag v-if="isVRTagShow"></v-tag>
      <v-thumbnails v-if="isUsingVRMode"></v-thumbnails>
      <pano-markers></pano-markers>
    </a-scene>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import PanoMarkers from '@/components/PanoContainer/PanoMarkers'
import PanoCamera from '@/components/PanoContainer/PanoCamera'
import VTag from '@/components/PanoContainer/VTag'
import VThumbnails from '@/components/PanoContainer/VThumbnails'

import tagImage from '@/assets/tag.png'
import pointImage from '@/assets/point.png'

export default {
  name: 'PanoContainer',

  components: {
    PanoMarkers,
    PanoCamera,
    VTag,
    VThumbnails
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
      'currentPanorama',
      'isUsingVRMode',
      'isVRTagShow'
    ])
  },

  methods: {
    ...mapActions([
      'setCurrentPanorama',
      'setCurrentMarker',
      'setIsUsingVRMode',
      'setIsVRTagShow',
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
      this.setIsVRTagShow(false)
      this.setIsModalShow(false)
      this.setCurrentMarker({})
    }
  },

  beforeMount () {
    this.setCurrentPanorama(this.panoramas[0])
  }
}
</script>

<style lang="stylus" scoped>
@import '../../css/variables'

#pano-container {
  position: relative
  height: 100vh
  z-index: 1
}
</style>
