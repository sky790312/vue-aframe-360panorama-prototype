<template>
  <a-entity id="pano-markers">
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
        }
      }
    }
  },

  computed: {
    ...mapGetters([
      'panoramas',
      'currentPanorama',
      'currentMarker',
      'isVRTagShow',
      'isUsingVRMode'
    ])

    // isVRTagShow () {
    //   return this.isUsingVRMode && this.currentMarker.type === 'tag'
    // }
  },

  methods: {
    ...mapActions([
      'setCurrentPanorama',
      'setCurrentMarker',
      'setIsVRTagShow',
      'setIsModalShow'
    ]),

    onMarkerClick (marker, e) {
      if (this.isUsingVRMode) {
        return
      }

      this.setCurrentMarker(marker)
      this.handleMarker(marker.type)
    },

    onMarkerMouseenter (marker, e) {
      if (this.isModalShow) {
        return
      }

      e.currentTarget.setAttribute('opacity', this.markerConfig.activeOpacity)
      if (this.isUsingVRMode) {
        this.setCurrentMarker(marker)
        this.handleMarker(marker.type)
      }
    },

    onMarkerMouseleave (marker, e) {
      if (this.isModalShow) {
        return
      }

      e.currentTarget.setAttribute('opacity', this.markerConfig.initialOpacity)
      if (this.isUsingVRMode) {
        this.setCurrentMarker({})
        this.setIsVRTagShow(false)
      }
    },

    handleMarker (type) {
      const marker = {
        tag: () => this.handleTag(),
        point: () => this.handlePoint()
      }
      return marker[type]()
    },

    handleTag () {
      (this.isUsingVRMode) ? this.setIsVRTagShow(true) : this.setIsModalShow(true)
    },

    handlePoint () {
      const foundPanorama = this.panoramas.find(panorama => panorama.id === this.currentMarker.nextPanoramaId)
      this.setCurrentPanorama(foundPanorama)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../css/variables'

#pano-marker {

}
</style>
