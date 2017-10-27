<template>
  <a-entity id="pano-markers">
    <a-plane
      v-if="shouldVRTagShow()"
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
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import logoImage from '@/assets/logo.png'

export default {
  name: 'PanoMarkers',

  data () {
    return {
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

  computed: {
    ...mapGetters([
      'isUsingVRMode'
    ])
  },

  methods: {
    ...mapActions([
      'setShouldModalShow'
    ]),

    shouldVRTagShow () {
      return this.isUsingVRMode && this.selectedMarker.type === 'tag'
    },

    onMarkerClick (marker, e) {
      console.log('click: ', marker)
      console.log('click event', e)
      this.setShouldModalShow(true)
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
    }
  }
}
</script>

<style lang="stylus" scoped>
#pano-marker {

}
</style>
