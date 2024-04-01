import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/index',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        component: () => import('pages/graphData/GraphData.vue')
      },
      {
        path: '/refuels/:id?',
        component: () => import('src/pages/refuels/layouts/RefuelLayout.vue'),
        children: [
          {
            path: '',
            component: () => import('src/pages/refuels/Refuels.vue'),
            props: true
          },
          {
            path: 'add',
            component: () => import('src/pages/refuels/RefuelForm.vue')
          },
          {
            path: 'edit/:id',
            component: () => import('src/pages/refuels/RefuelForm.vue'),
            props: true
          },
          {
            path: 'filter',
            component: () => import('src/pages/refuels/FilterRefuelsForm.vue')
          }
        ]
      },
      {
        path: '/vehicles',
        component: () => import('src/pages/vehicles/layouts/VehicleLayout.vue'),
        children: [
          {
            path: '',
            component: () => import('src/pages/vehicles/Vehicles.vue')
          },
          {
            path: 'add',
            component: () => import('src/pages/vehicles/VehicleForm.vue')
          },
          {
            path: 'edit/:id',
            component: () => import('src/pages/vehicles/VehicleForm.vue'),
            props: true
          }
        ]
      },
      {
        path: '/settings',
        component: () => import('pages/settings/Settings.vue')
      },
      {
        path: '/support',
        component: () => import('pages/support/Support.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
