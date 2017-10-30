import logoImage from '@/assets/logo.png'

const state = {
  markers: [{
    id: 1,
    type: 'tag',
    src: '#tag',
    position: '0 0 -8',
    text: 'Vue with aframe!',
    imageSrc: logoImage
  }, {
    id: 2,
    type: 'point',
    src: '#point',
    position: '5 0 -8'
  }],
  selectedMarker: {}
}

const getters = {
  markers: state => state.markers,
  selectedMarker: state => state.selectedMarker
}

const actions = {
  setMarkers ({ commit }, markers = []) {
    commit('SET_MARKERS', markers)
  },
  setSelectedMarker ({ commit }, selectedMarker = {}) {
    commit('SET_SELECTED_MARKER', selectedMarker)
  }
}

const mutations = {
  SET_MARKERS (state, markers = []) {
    state.markers = markers
  },
  SET_SELECTED_MARKER (state, selectedMarker = {}) {
    state.selectedMarker = selectedMarker
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
