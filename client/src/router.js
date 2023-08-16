// src/router.js
import { createRouter, createWebHistory } from 'vue-router'
import TextbooksPage from './components/TextbooksPage.vue'
import HelloWorld from './components/HelloWorld.vue'
import SessionManager from './components/SessionManager.vue'
import ExploreTextbooksPage from './components/ExploreTextbooksPage.vue'

const routes = [
  { path: '/', component: SessionManager },
  { path: '/textbooks', component: TextbooksPage},
  { path: '/explore-textbooks', component: ExploreTextbooksPage}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
