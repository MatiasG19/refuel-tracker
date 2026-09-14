import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/index',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        component: () => import('@/pages/dashboard/DashboardPage.vue')
      },
      {
        path: '/vehicles/:vehicleId?',
        component: () => import('@/pages/vehicles/layouts/VehicleLayout.vue'),
        children: [
          {
            path: '',
            component: () => import('@/pages/vehicles/VehiclesPage.vue')
          },
          {
            path: 'add',
            component: () => import('@/pages/vehicles/VehicleForm.vue')
          },
          {
            path: 'edit',
            component: () => import('@/pages/vehicles/VehicleForm.vue'),
            props: true
          },
          {
            path: 'refuels/:id?',
            component: () => import('@/pages/refuels/layouts/RefuelLayout.vue'),
            children: [
              {
                path: '',
                component: () => import('@/pages/refuels/RefuelsPage.vue'),
                props: true
              },
              {
                path: 'add',
                component: () => import('@/pages/refuels/RefuelForm.vue')
              },
              {
                path: 'edit',
                component: () => import('@/pages/refuels/RefuelForm.vue'),
                props: true
              },
              {
                path: 'addExpense',
                component: () => import('@/pages/refuels/ExpenseForm.vue')
              },
              {
                path: 'editExpense',
                component: () => import('@/pages/refuels/ExpenseForm.vue'),
                props: true
              },
              {
                path: 'filter',
                component: () => import('@/pages/refuels/FilterRefuelsForm.vue')
              }
            ]
          }
        ]
      },
      {
        path: '/settings',
        component: () => import('@/pages/settings/SettingsPage.vue')
      },
      {
        path: '/support',
        component: () => import('@/pages/support/SupportPage.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('@/pages/ErrorNotFound.vue')
  }
]

export default routes
