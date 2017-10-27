<template>
  <div id="app">
    <!-- <div class="aframe-container"> -->
      <a-scene
        ref="scene"
        @click="onSceneClick($event)"
        @enter-vr="handleEnterVR()"
        @exit-vr="handleExitVR()"
        @loaded="onResourceLoaded()"
        :vr-mode-ui="scene.vrModeUi"
        :cursor="scene.cursor"
        inspector>
        <a-assets>
          <img id="panorama" :src="panoramaImage">
          <img id="tag" :src="tagImage">
        </a-assets>
        <!-- Basic plane. -->
        <a-sky src="#panorama"></a-sky>
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
            v-if="isUsingVRMode && selectedMarker.type === 'tag'"
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
              :src="selectedMarker.image"
              :width="markerConfig.tag.imageWidth"
              :height="markerConfig.tag.imageHeight"
              :position="markerConfig.tag.imagePosition">
            </a-image>
          </a-plane>
          <a-image
            v-for="marker in markers" :key="marker.id"
            :width="markerConfig.width"
            :height="markerConfig.height"
            :color="markerConfig.color"
            :opacity="markerConfig.initialOpacity"
            :transparent="markerConfig.isTransparent"
            :src="marker.src"
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
        v-show="shouldModalShow"
        @closeModal="closeModal()">
        <template slot="body">
          in modal
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

import panoramaImage from '@/assets/panorama1.jpg'
import tagImage from '@/assets/tag.png'
import logoImage from '@/assets/logo.png'

export default {
  name: 'app',

  components: {
    IModal
  },

  data () {
    return {
      isUsingVRMode: false,
      shouldModalShow: false,
      panoramaImage: panoramaImage,
      tagImage: tagImage,
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
      markers: [{
        id: 1,
        type: 'tag',
        src: '#tag',
        position: '0 0 -8',
        text: 'Vue with aframe!',
        image: logoImage
      }],
      selectedMarker: {}
    }
  },

  mounted () {
    // console.log(this.$refs.scene)
    // this.$refs.scene.enterVR()
  },

  methods: {
    onResourceLoaded () {
      console.log('loaded')
    },

    onSceneClick (e) {
      // console.log('click scene: ', e)
    },

    onMarkerClick (marker, e) {
      console.log('click: ', marker)
      console.log('click event', e)
      this.shouldModalShow = true
    },

    onMarkerMouseenter (marker, e) {
      console.log('mouse enter', marker)
      console.log('mouse enter event', e)
      e.currentTarget.setAttribute('opacity', this.markerConfig.activeOpacity)
      this.selectedMarker = marker
    },

    onMarkerMouseleave (marker, e) {
      console.log('mouse leave', marker)
      console.log('mouse leave event', e)
      e.currentTarget.setAttribute('opacity', this.markerConfig.initialOpacity)
      this.selectedMarker = {}
    },

    onCameraChange (e) {
      // console.log('camera change: ', e)
    },

    closeModal () {
      this.shouldModalShow = false
    },

    handleEnterVR () {
      // this.$refs.scene.enterVR()
      this.isUsingVRMode = true
    },

    handleExitVR () {
      this.isUsingVRMode = false
      this.shouldModalShow = false
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
