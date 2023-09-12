import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'todoList',
      component: () => import('../views/TodoViews.vue')
    }
  ]
})

export default router
