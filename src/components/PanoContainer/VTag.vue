<template>
  <a-plane
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
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'VTag',

  data () {
    return {
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
      }
    }
  },

  computed: {
    ...mapGetters([
      'currentMarker',
      'isUsingVRMode'
    ])
  }
}
</script>

<style lang="stylus" scoped>
@import '../../css/variables'

</style>
