// src/router.js
import { createRouter, createWebHistory } from 'vue-router'
import TextbooksPage from './components/TextbooksPage.vue'
import HelloWorld from './components/HelloWorld.vue'
import SessionManager from './components/SessionManager.vue'

const routes = [
  { path: '/', component: SessionManager },
  { path: '/hello', component: HelloWorld },
  { path: '/textbooks', component: TextbooksPage}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
