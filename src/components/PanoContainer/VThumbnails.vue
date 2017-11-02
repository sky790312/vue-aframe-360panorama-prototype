<template>
  <a-entity>
    <a-entity
      v-for="(panorama, index) in panoramas"
      :key="panorama.id"
      :position="setPanoramaPosition(index)"
      @click="onVRMenuClick(panorama)">
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
  </a-entity>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'VThumbnails',

  data () {
    return {
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
      }
    }
  },

  computed: {
    ...mapGetters([
      'panoramas',
      'currentPanorama',
      'isUsingVRMode'
    ])
  },

  methods: {
    ...mapActions([
      'setCurrentPanorama'
    ]),

    setPanoramaPosition (index) {
      let coordinateX = (index + 1) * 10 - 15
      return `${coordinateX} -12 -70`
    },

    onVRMenuClick (panorama) {
      if (panorama.id === this.currentPanorama.id) {
        return
      }

      this.setCurrentPanorama(panorama)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../css/variables'

</style>
