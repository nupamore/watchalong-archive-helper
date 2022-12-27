import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages' // https://github.com/hannoeru/vite-plugin-pages

const router = createRouter({
  history: createWebHistory(),
  routes: [...routes],
})

export default router
