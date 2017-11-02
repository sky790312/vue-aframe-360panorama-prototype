<template>
  <a-entity>
    <a-entity
      v-for="(panorama, index) in panoramas"
      :key="panorama.id"
      :position="getPanoramaPosition(index)"
      @click="onVRMenuClick(panorama)">
      <a-image
        :src="panorama.imageSrc"
        :width="vMenu.imageWidth"
        :height="vMenu.imageHeight"
        :position="vMenu.imagePosition">
      </a-image>
      <a-plane
        :position="vMenu.planePosition"
        :color="vMenu.planeColor"
        :width="vMenu.planeWidth">
        <a-text
          :value="panorama.title"
          :width="vMenu.textSize"
          :color="vMenu.textColor"
          :position="vMenu.textPosition">
        </a-text>
      </a-plane>
    </a-entity>
  </a-entity>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'VMenu',

  data () {
    return {
      vMenu: {
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
      'isUsingVRMode'
    ])
  },

  methods: {
    ...mapActions([
      'setCurrentPanorama'
    ]),

    getPanoramaPosition (index) {
      let coordinateX = (index + 1) * 10 - 15
      return `${coordinateX} -7 -70`
    },

    onVRMenuClick (panorama) {
      this.setCurrentPanorama(panorama)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../css/variables'

</style>
