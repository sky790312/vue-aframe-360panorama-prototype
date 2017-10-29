import Vue from 'vue'
import Vuex from 'vuex'

import panoramas from './modules/panoramas'
import markers from './modules/markers'
import modal from './modules/modal'

Vue.use(Vuex)

const modules = {
  panoramas,
  markers,
  modal
}

const store = new Vuex.Store({
  modules,
  strict: true
})

export default store
