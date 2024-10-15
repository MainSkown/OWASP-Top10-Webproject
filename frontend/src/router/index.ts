import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/MainPage.vue'
import '../assets/main.css'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{ path: '/', component: Home }]
})

export default router
