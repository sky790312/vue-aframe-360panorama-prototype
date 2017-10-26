<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <router-view/> -->
    <!-- <div class="aframe-container"> -->
      <a-scene
        ref="scene"
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
          <a-image
            v-for="marker in markerSystem.markers" :key="marker.id"
            :width="markerSystem.width"
            :height="markerSystem.height"
            :color="markerSystem.color"
            :opacity="markerSystem.initialOpacity"
            :transparent="markerSystem.isTransparent"
            :src="marker.src"
            :position="marker.position"
            @click="onMarkerClick(marker, $event)"
            @mouseenter="onMarkerMouseenter(marker, $event)"
            @mouseleave="onMarkerMouseleave(marker, $event)">
            <a-animation
              :attribute="markerSystem.animation.attribute"
              :from="markerSystem.animation.from"
              :to="markerSystem.animation.to"
              :dur="markerSystem.animation.duration"
              :repeat="markerSystem.animation.repeat">
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

export default {
  name: 'app',

  components: {
    IModal
  },

  data () {
    return {
      isUsingVRMode: false,
      shouldModalShow: false,
      panoramaImage: require('./assets/panorama1.jpg'),
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
      markerSystem: {
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
        markers: [{
          id: 1,
          name: 'tag',
          src: require('./assets/tag.png'),
          position: '-2 0.25 -5'
        }]
      }
    }
  },

  mounted () {
    // console.log(this.$refs.scene)
    // this.$refs.scene.enterVR()
  },

  methods: {
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
      e.currentTarget.setAttribute('opacity', this.markerSystem.activeOpacity)
    },

    onMarkerMouseleave (marker, e) {
      console.log('mouse leave', marker)
      console.log('mouse leave event', e)
      e.currentTarget.setAttribute('opacity', this.markerSystem.initialOpacity)
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
