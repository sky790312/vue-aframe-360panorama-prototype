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
        <a-sky :src="currentPanorama.imageSrc"></a-sky>
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
            v-if="isVRTagShow"
            :width="vTag.planeWidth"
            :height="vTag.planeHeight"
            :color="vTag.planeColor"
            :position="vTag.planePosition">
            <a-text
              :value="currentMarker.text"
              :width="vTag.textSize"
              :position="vTag.textPosition"
              :color="vTag.textColor">
            </a-text>
            <a-image
              :src="currentMarker.imageSrc"
              :width="vTag.imageWidth"
              :height="vTag.imageHeight"
              :position="vTag.imagePosition">
            </a-image>
          </a-plane>
          <a-entity
            v-if="isUsingVRMode"
            v-for="(panorama, index) in panoramas"
            :key="panorama.id"
            :position="setPanoramaPosition(index)"
            @click="onThumbnailClick(panorama)">
            <a-image
              :src="panorama.imageSrc"
              :width="vThumbnail.imageWidth"
              :height="vThumbnail.imageHeight"
              :position="vThumbnail.imagePosition">
            </a-image>
            <a-plane
              :position="vThumbnail.planePosition"
              :color="vThumbnail.planeColor"
              :width="vThumbnail.planeWidth">
              <a-text
                :value="panorama.title"
                :width="vThumbnail.textSize"
                :color="vThumbnail.textColor"
                :position="vThumbnail.textPosition">
              </a-text>
            </a-plane>
          </a-entity>
          <a-image
            v-for="marker in currentPanorama.markers"
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
      <div class="menu-container">
        <i
          class="i-icon i-icon-2x i-icon-vr"
          @click="handleEnterVR()">
        </i>
      </div>
      <div class="thumbnail-container">
        <div
          v-for="panorama in panoramas"
          class="thumbnail"
          :key="panorama.id"
          @click="onThumbnailClick(panorama)">
          <img
            :src="panorama.imageSrc"
            class="thumbnail-img">
          <p class="thumbnail-title">{{ panorama.title }}</p>
        </div>
      </div>
      <i-modal
        class="black center"
        v-show="isModalShow"
        @closeModal="closeModal()">
        <template slot="body">
          <img :src="currentMarker.imageSrc">
          <p>{{ currentMarker.text}}</p>
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
      isVRTagShow: false,
      isModalShow: false,
      // panoramaImage: panoramaImage,
      tagImage: tagImage,
      pointImage: pointImage,
      logoImage: logoImage,
      scene: {
        vrModeUi: 'enabled: false',
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
        }
      },
      vTag: {
        planeWidth: 50,
        planeHeight: 40,
        planePosition: '0 12 -70',
        planeColor: '#000',
        imageWidth: 10,
        imageHeight: 10,
        imagePosition: '0 -6 45',
        textSize: 20,
        textPosition: '-3.5 -12 45',
        textColor: '#fff'
      },
      vThumbnail: {
        imageWidth: 7,
        imageHeight: 7,
        imagePosition: '0 0 45',
        planePosition: '0 -4 45',
        planeColor: '#000',
        planeWidth: '7',
        textColor: '#fff',
        textSize: 20,
        textPosition: '-2.2 .1 0'
      },
      panoramas: [{
        id: 'pano1',
        title: 'panorama1',
        rotation: '0 0 0',
        imageSrc: panoramaImage1,
        markers: [{
          id: 'pano1tag1',
          type: 'tag',
          iconSrc: tagImage,
          position: '0 -.5 -8',
          text: 'Vue with aframe!',
          imageSrc: logoImage
        }, {
          id: 'pano1point1',
          type: 'point',
          iconSrc: pointImage,
          nextPanoramaId: 'pano2',
          position: '5 0 -8'
        }]
      }, {
        id: 'pano2',
        title: 'panorama2',
        rotation: '0 0 0',
        imageSrc: panoramaImage2,
        markers: [{
          id: 'pano2point1',
          type: 'point',
          iconSrc: pointImage,
          nextPanoramaId: 'pano1',
          position: '3 1.5 -8'
        }]
      }],
      currentPanorama: {},
      currentMarker: {}
    }
  },

  computed: {
    // isVRTagShow () {
    //   return this.isUsingVRMode && this.currentMarker.type === 'tag'
    // }
  },

  methods: {
    setPanoramaPosition (index) {
      let coordinateX = (index + 1) * 10 - 15
      return `${coordinateX} -7 -70`
    },

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

      this.currentMarker = marker
      this.handleMarker(marker.type)
    },

    onThumbnailClick (panorama) {
      this.currentPanorama = panorama
    },

    onMarkerMouseenter (marker, e) {
      if (this.isModalShow) {
        return
      }

      e.currentTarget.setAttribute('opacity', this.markerConfig.activeOpacity)
      if (this.isUsingVRMode) {
        this.currentMarker = marker
        this.handleMarker(marker.type)
      }
    },

    onMarkerMouseleave (marker, e) {
      if (this.isModalShow) {
        return
      }

      e.currentTarget.setAttribute('opacity', this.markerConfig.initialOpacity)
      if (this.isUsingVRMode) {
        this.currentMarker = {}
        this.isVRTagShow = false
      }
    },

    onCameraChange (e) {
      // console.log('camera change: ', e)
    },

    closeModal () {
      this.isModalShow = false
      this.currentMarker = {}
    },

    handleEnterVR () {
      this.$refs.scene.enterVR()
      this.isUsingVRMode = true
    },

    handleExitVR () {
      this.isUsingVRMode = false
      this.isVRTagShow = false
      this.isModalShow = false
      this.currentMarker = {}
    },

    handleMarker (type) {
      const marker = {
        tag: () => this.handleTag(),
        point: () => this.handlePoint()
      }
      return marker[type]()
    },

    handleTag () {
      (this.isUsingVRMode) ? this.isVRTagShow = true : this.isModalShow = true
    },

    handlePoint () {
      this.currentPanorama = this.panoramas.find(panorama => panorama.id === this.currentMarker.nextPanoramaId)
    }
  },

  beforeMount () {
    this.currentPanorama = this.panoramas[0]
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

  .thumbnail-container {
    position: absolute
    bottom: 0
    display: flex
    justify-content: center
    width: 100%
    background-color: rgba(0 0 0, .7)
    z-index: 1
    padding: 20px

    .thumbnail {
      cursor: pointer
      margin: 0 20px

      &:hover {
        opacity: .8
      }
    }

    .thumbnail-img {
      width: 100px
      height: 100px
    }

    .thumbnail-title {
      color: #fff
    }
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
