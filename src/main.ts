import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { state } from './composable/useAuth'
import { verifyToken } from './composable/useAuth'
import axios from './service/axios'

import App from './App.vue'
import router from './router'

const app = createApp(App)

import { verifyToken } from './composable/useAuth'

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('collaborative-token')
  if (!to.meta.public && !token) {
    next({ name: 'login' })
  }
  if (token && (to.path === '/' || to.path === '/login' || to.path === '/signup')) {
    const response = await verifyToken()
    if (!response.success) {
      localStorage.removeItem('collaborative-token')
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    if (token && !state.user) {
      const response = await verifyToken()
      next()
    }
  }
  next()
})

app.use(createPinia())
app.use(router)

app.mount('#app')
