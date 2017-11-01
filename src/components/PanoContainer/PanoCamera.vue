<template>
  <a-camera
    id="pano-camera"
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
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PanoCamera',

  data () {
    return {
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
          duration: 300
        }
      }
    }
  },

  computed: {
    ...mapGetters([
      'isUsingVRMode'
    ])
  },

  methods: {
    onCameraChange (e) {
      // console.log('camera change: ', e)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../css/variables'

#pano-camera {

}
</style>
