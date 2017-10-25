<template>
  <a-entity id="pano-markers">
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
</template>

<script>

export default {
  name: 'PanoMarkers',

  data () {
    return {
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
          src: require('../assets/tag.png'),
          position: '-2 0.25 -5'
        }]
      }
    }
  },

  methods: {
    onMarkerClick (marker, e) {
      console.log('click: ', marker)
      console.log('click event', e)
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
    }
  }
}
</script>

<style lang="stylus" scoped>
#pano-marker {

}
</style>
