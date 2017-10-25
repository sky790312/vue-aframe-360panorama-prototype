const state = {
  isUsingVRMode: false
}

const getters = {
  isUsingVRMode: state => state.isUsingVRMode
}

const actions = {
  setIsUsingVRMode ({ commit }, isUsingVRMode = false) {
    commit('SET_IS_USING_VR_MODE', isUsingVRMode)
  }
}

const mutations = {
  SET_IS_USING_VR_MODE (state, isUsingVRMode = false) {
    state.isUsingVRMode = isUsingVRMode
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
