import { createRouter, createWebHistory } from 'vue-router'
import LandingLayout from '../layouts/LandingLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingLayout,
      children: [
        {
          path: '/nueva-ciudad',
          name: 'nueva-ciudad',
          component: () => import('../views/CiudadForm.vue')
        },
        {
          path: '/editar-ciudad/:id',
          name: 'editar-ciudad',
          component: () => import('../views/CiudadForm.vue')
        },
        {
          path: '/ciudades',
          name: 'ciudades',
          component: () => import('../views/CiudadList.vue')
        },
        {
          path: '/nuevo-atleta',
          name: 'nuevo-atleta',
          component: () => import('../views/AtletaForm.vue')
        },
        {
          path: '/editar-atleta/:id',
          name: 'editar-atleta',
          component: () => import('../views/AtletaForm.vue')
        },
        {
          path: '/atletas',
          name: 'atletas',
          component: () => import('../views/AtletaList.vue')
        }
      ]
    },
  ],
})

export default router
