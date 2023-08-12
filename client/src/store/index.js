import { createStore } from 'vuex'
import sessionManager from '../store/modules/session_manager'

const MODULES = {
  sessionManager,
}

const store = createStore({ 
  modules: MODULES
})

export default store