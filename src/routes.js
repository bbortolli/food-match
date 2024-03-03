import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'vote',
    component: () => import('@components/Vote.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@components/Login.vue')
  },
  {
    path: '/results',
    name: 'results',
    component: () => import('@components/Results.vue')
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});
