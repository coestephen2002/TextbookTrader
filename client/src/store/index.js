import { createStore } from 'vuex'
import sessionManager from '../store/modules/session_manager'
import textbooksManager from '../store/modules/textbooks_manager'
import universityManager from '../store/modules/university_manager'

const MODULES = {
  sessionManager: sessionManager,
  textbooksManager: textbooksManager,
  universityManager: universityManager,
}

const store = createStore({ 
  modules: MODULES,
})

export default store