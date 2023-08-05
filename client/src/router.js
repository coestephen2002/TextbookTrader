// src/router.js
import { createRouter, createWebHistory } from 'vue-router'
import TextbooksPage from './components/TextbooksPage.vue'
import HelloWorld from './components/HelloWorld.vue'

const routes = [
  { path: '/', component: TextbooksPage },
  { path: '/hello', component: HelloWorld },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
