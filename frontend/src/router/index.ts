import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/MainPage.vue'
import Admin from '@/pages/AdminPage.vue'
import '../assets/main.css'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{ path: '/', component: Home}, {path: '/admin', component: Admin}]
})

export default router
