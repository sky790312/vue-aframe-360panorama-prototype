<template>
  <a-entity id="pano-markers">
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
      }
    }
  },

  computed: {
    ...mapGetters([
      'panoramas',
      'markers',
      'selectedMarker',
      'isModalShow',
      'isUsingVRMode'
    ]),

    shouldVRTagShow () {
      return this.isUsingVRMode && this.selectedMarker.type === 'tag'
    }
  },

  methods: {
    ...mapActions([
      'setSelectedPanorama',
      'setSelectedMarker',
      'setIsModalShow'
    ]),

    onMarkerClick (marker, e) {
      if (this.isUsingVRMode) {
        return
      }

      this.setSelectedMarker(marker)
      this.handleMarker(marker.type)
    },

    onMarkerMouseenter (marker, e) {
      if (this.isModalShow) {
        return
      }

      e.currentTarget.setAttribute('opacity', this.markerConfig.activeOpacity)
      this.setSelectedMarker(marker)
    },

    onMarkerMouseleave (marker, e) {
      if (this.isModalShow) {
        return
      }

      e.currentTarget.setAttribute('opacity', this.markerConfig.initialOpacity)
      this.setSelectedMarker({})
    },

    handleMarker (type) {
      const marker = {
        tag: () => this.handleTag(),
        point: () => this.handlePoint()
      }
      return marker[type]()
    },

    handleTag () {
      this.setIsModalShow(true)
    },

    handlePoint () {
      const foundPanorama = this.panoramas.find(panorama => panorama.id === this.selectedMarker.nextPanoramaId)
      this.setSelectedPanorama(foundPanorama)
    }
  }
}
</script>

<style lang="stylus" scoped>
#pano-marker {

}
</style>
