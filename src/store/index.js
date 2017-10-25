import Vue from 'vue'
import Vuex from 'vuex'

import panoramas from './modules/panoramas'

Vue.use(Vuex)

const modules = {
  panoramas
}

const store = new Vuex.Store({
  modules,
  strict: true
})

export default store
