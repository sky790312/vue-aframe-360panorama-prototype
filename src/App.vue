<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <router-view/> -->
    <pano-container></pano-container>
    <menu-container></menu-container>
    <pano-thumb-list></pano-thumb-list>
    <i-modal
      class="black center"
      v-show="isModalShow"
      @closeModal="closeModal()">
      <template slot="body">
        <img :src="selectedMarker.imageSrc">
        <p>{{ selectedMarker.text }}</p>
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
import PanoThumbList from '@/components/PanoThumbList'

import IModal from '@/components/UI/IModal'

export default {
  name: 'App',

  components: {
    PanoContainer,
    MenuContainer,
    PanoThumbList,
    IModal
  },

  data () {
    return {

    }
  },

  computed: {
    ...mapGetters([
      'markers',
      'selectedMarker',
      'isModalShow'
    ])
  },

  methods: {
    ...mapActions([
      'setIsModalShow'
    ]),

    closeModal () {
      this.setIsModalShow(false)
    }
  },

  mounted () {

  }
}
</script>

<style lang="stylus">
@import './css'

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  height: 100%
}
</style>
