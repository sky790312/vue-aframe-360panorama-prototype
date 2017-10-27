<template>
  <div class="i-modal" @click.self="handleCloseModal()">
    <div
      class="modal-content">
      <div class="modal-header">
        <button
          v-if="canClose"
          type="button"
          class="close"
          @click="handleCloseModal()">
          <span>&times;</span>
        </button>
        <h5
          v-if="title"
          class="modal-title">
          {{ $t(title) }}
        </h5>
      </div>
      <div class="modal-body">
        <slot name="body"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IModal',
  props: {
    title: {
      type: String,
      default () {
        return ''
      }
    },

    // background: {
    //   type: String,
    //   default () {
    //     return 'white'
    //   }
    // },

    // isCentered: {
    //   type: Boolean,
    //   default () {
    //     return true
    //   }
    // },

    canClose: {
      type: Boolean,
      default () {
        return true
      }
    }
  },

  computed: {
    // dynamicClasses () {
    //   return {
    //     'centered': this.isCentered
    //   }
    // }
  },

  methods: {
    handleCloseModal () {
      this.$emit('closeModal', false)
    },

    closeModalByKeyup (event) {
      if (event.keyCode === 27) {
        this.handleCloseModal()
      }
    }
  },

  mounted () {
    document.addEventListener('keyup', this.closeModalByKeyup)
  },

  beforeDestroy () {
    document.removeEventListener('keyup', this.closeModalByKeyup)
  }
}
</script>

<style lang="stylus" scoped>

$white = #fff
$black = #000
$dark-gray = #58585a

.i-modal {
  position: fixed
  top: 0
  right: 0
  bottom: 0
  left: 0
  z-index: 1040
  overflow: hidden
  outline: 0
  -webkit-overflow-scrolling: touch

  &.white {
    background-color: alpha($black, 30%)
    color: $black

    .modal-content {
      background-color: alpha($white, 70%)

      .close {
        color: $black
      }
    }
  }

  &.black {
    background-color: alpha($white, 30%)
    color: $white

    .modal-content {
      background-color: alpha($black, 70%)

      .close {
        color: $white
      }
    }
  }

  &.center {
    display: flex
    align-items: center
    justify-content: center
    flex-direction: row
  }

  .modal-content {
    min-width: 420px
    min-height: 200px
    padding: 20px
    box-sizing: border-box

    .modal-header {
      position: relative;
      margin: 0 0 10px
      min-height: 33px
    }

    .modal-footer {
      padding: 15px 20px 20px
    }

    .close {
      position: absolute
      top: 0
      right: 0
      font-size: 1.5rem
      font-weight: bold
      border: none
      outline: none
      background-color: transparent
    }
  }
}
</style>
