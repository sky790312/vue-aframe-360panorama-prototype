const state = {
  isModalShow: false
}

const getters = {
  isModalShow: state => state.isModalShow
}

const actions = {
  setIsModalShow ({ commit }, isModalShow = false) {
    commit('SET_IS_MODAL_SHOW', isModalShow)
  }
}

const mutations = {
  SET_IS_MODAL_SHOW (state, isModalShow = false) {
    state.isModalShow = isModalShow
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
