import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import store from './store'

//Load JWT from Local Storage on Refresh.
let localAuthToken = localStorage.auth_token;
let cookieExists = localAuthToken !== 'undefined' && localAuthToken !== null;
if (cookieExists) {
  const auth_token = localStorage.getItem('auth_token');
  const auth_token_exists = auth_token !== 'undefined' && auth_token !== null;
  if (auth_token_exists) {
    store.dispatch('loginUserWithToken', { auth_token });
  }
}

createApp(App).use(router).mount('#app')
