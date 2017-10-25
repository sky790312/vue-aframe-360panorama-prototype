<template>
  <div id="menu-container">
    <i
      class="i-icon i-icon-2x i-icon-vr"
      @click="onEnterVR()">
    </i>
  </div>
</template>

<script>

export default {
  name: 'MenuContainer',

  data () {
    return {
    }
  },

  methods: {
    onEnterVR () {
      const PanoContainerEl = this.$parent.$children.find(el => el.$options.name === 'PanoContainer')
      PanoContainerEl.$refs.sceneEl.enterVR()
    }
  }
}
</script>

<style lang="stylus" scoped>
#menu-container {
  position: absolute
  top: 20px
  right: 20px
  z-index: 1
}
</style>
