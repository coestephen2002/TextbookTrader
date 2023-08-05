// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import TextBook from './components/TextBooks.vue';
import HelloWorld from './components/HelloWorld.vue';

const routes = [
  { path: '/', component: TextBook },
  { path: '/hello', component: HelloWorld },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
