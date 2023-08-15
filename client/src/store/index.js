import { createStore } from 'vuex'
import sessionManager from '../store/modules/session_manager'
import textbooksManager from '../store/modules/textbooks_manager'

const MODULES = {
  sessionManager: sessionManager,
  textbooksManager: textbooksManager,
}

const store = createStore({ 
  modules: MODULES,
})

export default store