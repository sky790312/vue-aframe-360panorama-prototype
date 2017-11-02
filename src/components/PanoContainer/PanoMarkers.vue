<template>
  <a-entity id="pano-markers">
    <a-plane
      v-if="isVRTagShow"
      :width="markerConfig.tag.planeWidth"
      :height="markerConfig.tag.planeHeight"
      :color="markerConfig.tag.planeColor"
      :position="markerConfig.tag.planePosition">
      <a-text
        :value="currentMarker.text"
        :width="markerConfig.tag.textSize"
        :position="markerConfig.tag.textPosition"
        :color="markerConfig.tag.textColor">
      </a-text>
      <a-image
        :src="currentMarker.imageSrc"
        :width="markerConfig.tag.imageWidth"
        :height="markerConfig.tag.imageHeight"
        :position="markerConfig.tag.imagePosition">
      </a-image>
    </a-plane>
    <a-entity
      v-if="isUsingVRMode"
      v-for="(panorama, index) in panoramas"
      :key="panorama.id"
      :position="getPanoramaPosition(index)"
      @click="onVRMenuClick(panorama)">
      <a-image
        :src="panorama.imageSrc"
        :width="markerConfig.panosMenu.imageWidth"
        :height="markerConfig.panosMenu.imageHeight"
        :position="markerConfig.panosMenu.imagePosition">
      </a-image>
      <a-plane
        :position="markerConfig.panosMenu.planePosition"
        :color="markerConfig.panosMenu.planeColor"
        :width="markerConfig.panosMenu.planeWidth">
        <a-text
          :value="panorama.title"
          :width="markerConfig.panosMenu.textSize"
          :color="markerConfig.panosMenu.textColor"
          :position="markerConfig.panosMenu.textPosition">
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
          imageWidth: 10,
          imageHeight: 10,
          imagePosition: '0 -6 45',
          textSize: 20,
          textPosition: '-3.5 -12 45',
          textColor: '#fff'
        },
        panosMenu: {
          imageWidth: 7,
          imageHeight: 7,
          imagePosition: '0 0 45',
          planePosition: '0 -4 45',
          planeColor: '#000',
          planeWidth: '7',
          textColor: '#fff',
          textSize: 20,
          textPosition: '-2.2 .1 0'
        }
      }
    }
  },

  computed: {
    ...mapGetters([
      'panoramas',
      'markers',
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

    getPanoramaPosition (index) {
      let coordinateX = (index + 1) * 10 - 15
      return `${coordinateX} -7 -70`
    },

    onVRMenuClick (panorama) {
      this.setCurrentPanorama(panorama)
    },

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
