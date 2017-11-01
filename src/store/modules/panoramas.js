import panoramaImage1 from '@/assets/panorama1.jpg'
import panoramaImage2 from '@/assets/panorama2.jpg'

import tagImage from '@/assets/tag.png'
import pointImage from '@/assets/point.png'
import logoImage from '@/assets/logo.png'

const state = {
  panoramas: [{
    id: 'pano1',
    title: 'panorama1',
    rotation: '0 0 0',
    imageSrc: panoramaImage1,
    markers: [{
      id: 'pano1tag1',
      type: 'tag',
      iconSrc: tagImage,
      position: '0 -.5 -8',
      text: 'Vue with aframe!',
      imageSrc: logoImage
    }, {
      id: 'pano1point1',
      type: 'point',
      iconSrc: pointImage,
      nextPanoramaId: 'pano2',
      position: '5 0 -8'
    }]
  }, {
    id: 'pano2',
    title: 'panorama2',
    rotation: '0 0 0',
    imageSrc: panoramaImage2,
    markers: [{
      id: 'pano2point1',
      type: 'point',
      iconSrc: pointImage,
      nextPanoramaId: 'pano1',
      position: '3 -.5 -8'
    }]
  }],
  currentPanorama: {},
  isUsingVRMode: false
}

const getters = {
  panoramas: state => state.panoramas,
  currentPanorama: state => state.currentPanorama,
  isUsingVRMode: state => state.isUsingVRMode
}

const actions = {
  setCurrentPanorama ({ commit }, currentPanorama = {}) {
    commit('SET_CURRENT_PANORAMA', currentPanorama)
  },
  setIsUsingVRMode ({ commit }, isUsingVRMode = false) {
    commit('SET_IS_USING_VR_MODE', isUsingVRMode)
  }
}

const mutations = {
  SET_CURRENT_PANORAMA (state, currentPanorama = {}) {
    state.currentPanorama = currentPanorama
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
