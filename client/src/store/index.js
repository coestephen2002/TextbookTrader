import { createStore } from 'vuex'
import sessionManager from '../store/modules/session_manager'
//import createPersistedState from 'vuex-persistedstate'

const MODULES = {
  sessionManager,
}

const store = createStore({ 
  modules: MODULES,
  //plugins: [createPersistedState()]
})

export default store