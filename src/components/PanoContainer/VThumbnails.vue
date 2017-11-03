<template>
  <a-entity>
    <a-entity
      v-for="(panorama, index) in panoramas"
      :key="panorama.id"
      :position="setPanoramaPosition(index)"
      @click="onVThumbnailClick(panorama)">
      <v-thumbnail
        :panorama="panorama">
      </v-thumbnail>
    </a-entity>
  </a-entity>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VThumbnail from '@/components/PanoContainer/VThumbnail'

export default {
  name: 'VThumbnails',

  components: {
    VThumbnail
  },

  data () {
    return {
    }
  },

  computed: {
    ...mapGetters([
      'panoramas',
      'currentPanorama'
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

    onVThumbnailClick (panorama) {
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
