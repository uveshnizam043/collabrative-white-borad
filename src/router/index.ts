import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/public/login.vue'
import Signup from '@/views/public/signup.vue'
import Documents from '../views/documents/index.vue'
import Document from '../views/document/index.vue'
import NotFound from '../views/public/Not-found.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { public: true }
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      meta: { public: true }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
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
      path: '/editor/:id',
      name: 'editor',
      component: () => import('../views/document/index.vue')
    },
    {
      path: '/editor1/:id',
      name: 'editor1',
      component: () => import('../views/document/index1.vue')
    },
    {
      path: '/editor1/access/:id',
      name: 'editor1-access', // Changed name to avoid duplication
      component: () => import('../views/document/accessDocument.vue')
    }
  ]
})

export default router
