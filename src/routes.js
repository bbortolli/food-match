import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/home',
    name: 'home',
    component: () => import('@components/Home.vue')
  },
  {
    path: '/vote',
    name: 'vote',
    component: () => import('@components/Vote.vue')
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
