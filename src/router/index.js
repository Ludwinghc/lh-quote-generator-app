import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('../views/LandingView.vue'),
    },
    {
      path: '/nueva-cotizacion',
      name: 'quote',
      component: () => import('../views/QuoteView.vue'),
    },
  ],
})

export default router
