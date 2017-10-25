<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <router-view/> -->
    <pano-container></pano-container>
    <menu-container></menu-container>
  </div>
</template>

<script>
/* eslint-disable */
import AFRAME from 'aframe'
/* eslint-enable */

import PanoContainer from '@/components/PanoContainer'
import MenuContainer from '@/components/MenuContainer'

export default {
  name: 'App',

  components: {
    PanoContainer,
    MenuContainer
  },

  data () {
    return {

    }
  },

  computed: {

  },

  methods: {

  },

  mounted () {
    console.log(this.$refs)
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
