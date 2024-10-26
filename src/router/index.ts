import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/public/login.vue'
import Signup from '@/views/public/signup.vue'
import Test from '../views/test.vue'
import Documents from '../views/documents/index.vue'
import Document from '../views/document/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
      children: [
        {
          path: '/',
          name: 'login',
          component: Login,
          meta: { public: true }
        },
        {
          path: '/documents',
          name: 'documents',
          component: Documents
        },
        {
          path: '/document/:id',
          name: 'document',
          component: Document
        },
        {
          path: '/signup',
          name: 'Signup',
          component: Signup,
          meta: { public: true }
        },

        {
          path: '/editor/:id',
          name: 'editor',
          component: () => import('../views/document/index.vue')
        }
      ]
    }
  ]
})

export default router
