const state = {
  shouldModalShow: false
}

const getters = {
  shouldModalShow: state => state.shouldModalShow
}

const actions = {
  setShouldModalShow ({ commit }, shouldModalShow = false) {
    commit('SET_SHOULD_MODAL_SHOW', shouldModalShow)
  }
}

const mutations = {
  SET_SHOULD_MODAL_SHOW (state, shouldModalShow = false) {
    state.shouldModalShow = shouldModalShow
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
