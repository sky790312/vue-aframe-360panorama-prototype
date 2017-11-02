<template>
  <div id="app">
    <pano-container></pano-container>
    <menu-container></menu-container>
    <thumbnail-container></thumbnail-container>
    <i-modal
      class="black center"
      v-show="isModalShow"
      @closeModal="closeModal()">
      <template slot="body">
        <img :src="currentMarker.imageSrc">
        <p>{{ currentMarker.text }}</p>
      </template>
    </i-modal>
  </div>
</template>

<script>
/* eslint-disable */
import AFRAME from 'aframe'
/* eslint-enable */
import { mapGetters, mapActions } from 'vuex'

import PanoContainer from '@/components/PanoContainer'
import MenuContainer from '@/components/MenuContainer'
import thumbnailContainer from '@/components/thumbnailContainer'

import IModal from '@/components/UI/IModal'

export default {
  name: 'App',

  components: {
    PanoContainer,
    MenuContainer,
    thumbnailContainer,
    IModal
  },

  data () {
    return {

    }
  },

  computed: {
    ...mapGetters([
      'currentMarker',
      'isModalShow'
    ])
  },

  methods: {
    ...mapActions([
      'setIsModalShow',
      'setCurrentMarker'
    ]),

    closeModal () {
      this.setIsModalShow(false)
      this.setCurrentMarker({})
    }
  },

  mounted () {

  }
}
</script>

<style lang="stylus">
@import './css'
</style>

<style lang="stylus" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  height: 100%
}
</style>
