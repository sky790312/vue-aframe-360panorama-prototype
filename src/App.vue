<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <router-view/> -->
    <pano-container></pano-container>
    <menu-container></menu-container>
    <i-modal
      class="black center"
      v-show="shouldModalShow"
      @closeModal="closeModal()">
      <template slot="body">
        in modal
      </template>
    </i-modal>
  </div>
</template>

<script>
/* eslint-disable */
import AFRAME from 'aframe'
import { mapGetters, mapActions } from 'vuex'
/* eslint-enable */

import PanoContainer from '@/components/PanoContainer'
import MenuContainer from '@/components/MenuContainer'

import IModal from '@/components/UI/IModal'

export default {
  name: 'App',

  components: {
    PanoContainer,
    MenuContainer,
    IModal
  },

  data () {
    return {

    }
  },

  computed: {
    ...mapGetters([
      'shouldModalShow'
    ])
  },

  methods: {
    ...mapActions([
      'setShouldModalShow'
    ]),

    closeModal () {
      this.setShouldModalShow(false)
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
