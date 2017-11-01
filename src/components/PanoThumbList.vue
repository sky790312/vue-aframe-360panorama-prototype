<template>
  <div id="pano-thumb-list">
    <div
      v-for="panorama in panoramas"
      class="thumbnail"
      :key="panorama.id"
      @click="onThumbnailClick(panorama)">
      <img
        :src="panorama.imageSrc"
        class="thumbnail-img">
      <p class="thumbnail-title">{{ panorama.title }}</p>
    </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PanoThumbList',

  data () {
    return {
    }
  },

  computed: {
    ...mapGetters([
      'panoramas'
    ])
  },

  methods: {
    ...mapActions([
      'setCurrentPanorama'
    ]),

    onThumbnailClick (panorama) {
      this.setCurrentPanorama(panorama)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../css/variables'

#pano-thumb-list {
  position: absolute
  bottom: 0
  display: flex
  justify-content: center
  width: 100%
  background-color: rgba($black, .7)
  z-index: 1
  padding: 20px

  .thumbnail {
    cursor: pointer
    margin: 0 20px

    &:hover {
      opacity: .8
    }
  }

  .thumbnail-img {
    width: 100px
    height: 100px
  }

  .thumbnail-title {
    color: $white
  }
}
</style>
