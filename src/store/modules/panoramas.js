import panoramaImage1 from '@/assets/panorama1.jpg'
import panoramaImage2 from '@/assets/panorama2.jpg'

const state = {
  panoramas: [{
    id: 1,
    title: 'panorama1',
    rotation: '0 0 0',
    imageSrc: panoramaImage1
    // imageSrc: 'http://www.easypano.com/images/pw/v3/banner.jpg'
  }, {
    id: 2,
    title: 'panorama2',
    rotation: '0 0 0',
    imageSrc: panoramaImage2
  }],
  selectedPanorama: {},
  isUsingVRMode: false
}

const getters = {
  panoramas: state => state.panoramas,
  selectedPanorama: state => state.selectedPanorama,
  isUsingVRMode: state => state.isUsingVRMode
}

const actions = {
  setSelectedPanorama ({ commit }, selectedPanorama = {}) {
    commit('SET_SELECTED_PANORAMA', selectedPanorama)
  },
  setIsUsingVRMode ({ commit }, isUsingVRMode = false) {
    commit('SET_IS_USING_VR_MODE', isUsingVRMode)
  }
}

const mutations = {
  SET_SELECTED_PANORAMA (state, selectedPanorama = {}) {
    state.selectedPanorama = selectedPanorama
  },
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
