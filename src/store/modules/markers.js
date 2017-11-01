const state = {
  currentMarker: {},
  isVRTagShow: false
}

const getters = {
  currentMarker: state => state.currentMarker,
  isVRTagShow: state => state.isVRTagShow
}

const actions = {
  setCurrentMarker ({ commit }, currentMarker = {}) {
    commit('SET_CURRENT_MARKER', currentMarker)
  },
  setIsVRTagShow ({ commit }, isVRTagShow = false) {
    commit('SET_IS_VR_TAG_SHOW', isVRTagShow)
  }
}

const mutations = {
  SET_CURRENT_MARKER (state, currentMarker = {}) {
    state.currentMarker = currentMarker
  },
  SET_IS_VR_TAG_SHOW (state, isVRTagShow = false) {
    state.isVRTagShow = isVRTagShow
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
