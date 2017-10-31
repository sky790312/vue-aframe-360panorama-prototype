<template>
  <div id="app">
    <!-- <div class="aframe-container"> -->
      <a-scene
        class="scene"
        ref="scene"
        @click="onSceneClick($event)"
        @enter-vr="handleEnterVR()"
        @exit-vr="handleExitVR()"
        @loaded="onResourceLoaded()"
        :vr-mode-ui="scene.vrModeUi"
        :cursor="scene.cursor"
        inspector>
        <a-assets>
          <img
            v-for="panorama in panoramas"
            :key="panorama.id"
            :src="panorama.imageSrc">
          <img id="tag" :src="tagImage">
          <img id="point" :src="pointImage">
        </a-assets>
        <!-- Basic plane. -->
        <a-sky :src="selectedPanorama.imageSrc"></a-sky>
        <a-camera
          :reverse-mouse-drag="camera.shouldReverseDrag"
          @componentchanged="onCameraChange($event)">
          <a-cursor
            v-if="isUsingVRMode"
            :fuse="cursor.shouldFuse"
            :color="cursor.color"
            :position="cursor.position">
            <a-animation
              :begin="cursor.animation.begin"
              :attribute="cursor.animation.attribute"
              :fill="cursor.animation.fill"
              :from="cursor.animation.from"
              :to="cursor.animation.to"
              :dur="cursor.animation.duration">
            </a-animation>
          </a-cursor>
        </a-camera>
        <a-entity>
          <a-plane
            v-if="shouldVRTagShow"
            :width="markerConfig.tag.planeWidth"
            :height="markerConfig.tag.planeHeight"
            :position="markerConfig.tag.planePosition"
            :color="markerConfig.tag.planeColor">
            <a-text
              :value="selectedMarker.text"
              :width="markerConfig.tag.fontSize"
              :position="markerConfig.tag.fontPosition">
            </a-text>
            <a-image
              :src="selectedMarker.imageSrc"
              :width="markerConfig.tag.imageWidth"
              :height="markerConfig.tag.imageHeight"
              :position="markerConfig.tag.imagePosition">
            </a-image>
          </a-plane>
          <a-image
            v-for="marker in markers"
            :key="marker.id"
            :width="markerConfig.width"
            :height="markerConfig.height"
            :color="markerConfig.color"
            :opacity="markerConfig.initialOpacity"
            :transparent="markerConfig.isTransparent"
            :src="marker.iconSrc"
            :position="marker.position"
            @click="onMarkerClick(marker, $event)"
            @mouseenter="onMarkerMouseenter(marker, $event)"
            @mouseleave="onMarkerMouseleave(marker, $event)">
            <a-animation
              :attribute="markerConfig.animation.attribute"
              :from="markerConfig.animation.from"
              :to="markerConfig.animation.to"
              :dur="markerConfig.animation.duration"
              :repeat="markerConfig.animation.repeat">
            </a-animation>
          </a-image>
        </a-entity>
      </a-scene>
      <!-- <div class="menu-container">
        <i
          class="i-icon i-icon-2x i-icon-vr"
          @click="handleEnterVR()">
        </i>
      </div> -->
      <i-modal
        class="black center"
        v-show="isModalShow"
        @closeModal="closeModal()">
        <template slot="body">
          <img :src="selectedMarker.imageSrc">
          <p>{{ selectedMarker.text}}</p>
        </template>
      </i-modal>
    <!-- </div> -->
  </div>
</template>

<script>
/* eslint-disable */
import AFRAME from 'aframe'
/* eslint-enable */
import IModal from '@/components/UI/IModal'

import panoramaImage1 from '@/assets/panorama1.jpg'
import panoramaImage2 from '@/assets/panorama2.jpg'
import tagImage from '@/assets/tag.png'
import pointImage from '@/assets/point.png'
import logoImage from '@/assets/logo.png'

export default {
  name: 'app',

  components: {
    IModal
  },

  data () {
    return {
      isUsingVRMode: false,
      isModalShow: false,
      // panoramaImage: panoramaImage,
      tagImage: tagImage,
      pointImage: pointImage,
      logoImage: logoImage,
      scene: {
        vrModeUi: 'enabled: true',
        cursor: 'rayOrigin: mouse'
      },
      camera: {
        shouldReverseDrag: true
      },
      cursor: {
        shouldFuse: true,
        color: '#fff',
        position: '0 0 -1',
        animation: {
          begin: 'fusing',
          attribute: 'scale',
          form: '1 1 1',
          to: '0.1 0.1 0.1',
          fill: 'backwards',
          duration: 1500
        }
      },
      markerConfig: {
        width: 1,
        height: 1,
        color: '#fff',
        initialOpacity: '.6',
        activeOpacity: '.8',
        isTransparent: true,
        animation: {
          attribute: 'scale',
          from: '.8 .8 1',
          to: '1 1 1',
          duration: 1500,
          repeat: 'indefinite'
        },
        tag: {
          planeWidth: 50,
          planeHeight: 40,
          planePosition: '0 12 -70',
          planeColor: '#000',
          fontSize: '6',
          fontPosition: '-1 -10.6 65',
          imageWidth: 20,
          imageHeight: 20,
          imagePosition: '0 0 7'
        }
      },
      panoramas: [{
        id: 1,
        title: 'panorama1',
        rotation: '0 0 0',
        imageSrc: panoramaImage1
        // imageSrc: 'http://www.easypano.com/images/pw/v3/banner.jpg'
      }, {
        id: 2,
        title: 'panorama2',
        rotation: '0 0 0',
        imageSrc: panoramaImage2
      }],
      markers: [{
        id: 1,
        type: 'tag',
        iconSrc: tagImage,
        position: '0 -.5 -8',
        text: 'Vue with aframe!',
        imageSrc: logoImage
      }, {
        id: 2,
        type: 'point',
        iconSrc: pointImage,
        nextPanoramaId: 2,
        position: '5 0 -8'
      }],
      selectedPanorama: {},
      selectedMarker: {}
    }
  },

  computed: {
    shouldVRTagShow () {
      return this.isUsingVRMode && this.selectedMarker.type === 'tag'
    }
  },

  methods: {
    onResourceLoaded () {
      console.log('loaded')
    },

    onSceneClick (e) {
      // console.log('click scene: ', e)
    },

    onMarkerClick (marker, e) {
      if (this.isUsingVRMode) {
        return
      }

      this.handleMarker(marker.type)
    },

    onMarkerMouseenter (marker, e) {
      if (this.isModalShow) {
        return
      }

      e.currentTarget.setAttribute('opacity', this.markerConfig.activeOpacity)
      this.selectedMarker = marker
    },

    onMarkerMouseleave (marker, e) {
      if (this.isModalShow) {
        return
      }

      e.currentTarget.setAttribute('opacity', this.markerConfig.initialOpacity)
      this.selectedMarker = {}
    },

    onCameraChange (e) {
      // console.log('camera change: ', e)
    },

    closeModal () {
      this.isModalShow = false
    },

    handleEnterVR () {
      // this.$refs.scene.enterVR()
      this.isUsingVRMode = true
    },

    handleExitVR () {
      this.isUsingVRMode = false
      this.isModalShow = false
    },

    handleMarker (type) {
      const marker = {
        tag: () => this.handleTag(),
        point: () => this.handlePoint()
      }
      return marker[type]()
    },

    handleTag () {
      this.isModalShow = true
    },

    handlePoint () {
      this.selectedPanorama = this.panoramas.find(panorama => panorama.id === this.selectedMarker.nextPanoramaId)
    }
  },

  beforeMount () {
    this.selectedPanorama = this.panoramas[0]
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

  .scene {
    position: relative
    z-index: 0
  }

  .menu-container {
    position: absolute
    top: 20px
    right: 20px
    z-index: 1
  }

  .i-icon {
    display: block
    width: 25px
    height: 25px
    cursor: pointer

    &:hover {
      opacity: .5
    }

    &.i-icon-2x {
      width: 50px
      height: 50px
    }

    &.i-icon-vr {
      background-image: url('./assets/vr.svg')
    }
  }
}

</style>
