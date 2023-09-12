import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import store from './store'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';

// Load JWT from Local Storage on Refresh.
let localAuthToken = localStorage.auth_token
let cookieExists = localAuthToken !== 'undefined' && localAuthToken !== null
if (cookieExists) {
  const auth_token = localStorage.getItem('auth_token')
  const auth_token_exists = auth_token !== 'undefined' && auth_token !== null
  if (auth_token_exists) {
    store.dispatch('sessionManager/loginUserWithToken', { auth_token }) // Assuming 'sessionManager' is the module name
  }
}

const app = createApp(App) // Create a new Vue app instance
app.use(store) // Use your Vuex store instance in the app
app.use(router) // Use your router instance
app.use(VueSweetalert2)
app.mount('#app') // Mount the app to a DOM element with the id 'app'