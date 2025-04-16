import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/index',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        component: () => import('pages/dashboard/DashboardPage.vue')
      },
      {
        path: '/vehicles/:vehicleId?',
        component: () => import('src/pages/vehicles/layouts/VehicleLayout.vue'),
        children: [
          {
            path: '',
            component: () => import('src/pages/vehicles/VehiclesPage.vue')
          },
          {
            path: 'add',
            component: () => import('src/pages/vehicles/VehicleForm.vue')
          },
          {
            path: 'edit',
            component: () => import('src/pages/vehicles/VehicleForm.vue'),
            props: true
          },
          {
            path: 'refuels/:refuelId?',
            component: () =>
              import('src/pages/refuels/layouts/RefuelLayout.vue'),
            children: [
              {
                path: '',
                component: () => import('src/pages/refuels/RefuelsPage.vue'),
                props: true
              },
              {
                path: 'add',
                component: () => import('src/pages/refuels/RefuelForm.vue')
              },
              {
                path: 'edit',
                component: () => import('src/pages/refuels/RefuelForm.vue'),
                props: true
              },
              {
                path: 'addExpense',
                component: () => import('src/pages/refuels/ExpenseForm.vue')
              },
              {
                path: 'editExpense',
                component: () => import('src/pages/refuels/ExpenseForm.vue'),
                props: true
              },
              {
                path: 'filter',
                component: () =>
                  import('src/pages/refuels/FilterRefuelsForm.vue')
              }
            ]
          }
        ]
      },
      {
        path: '/settings',
        component: () => import('pages/settings/SettingsPage.vue')
      },
      {
        path: '/support',
        component: () => import('pages/support/SupportPage.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
