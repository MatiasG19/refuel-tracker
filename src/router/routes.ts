import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue')
      },
      {
        path: '/refuels',
        component: () => import('layouts/RefuelLayout.vue'),
        children: [
          {
            path: '',
            component: () => import('pages/RefuelEntries.vue')
          },
          {
            path: 'add',
            component: () => import('pages/RefuelForm.vue')
          },
          {
            path: 'edit',
            component: () => import('pages/RefuelForm.vue')
          },
          {
            path: 'filter',
            component: () => import('pages/FilterRefuelEntriesForm.vue')
          }
        ]
      },
      {
        path: '/vehicles',
        component: () => import('layouts/VehicleLayout.vue'),
        children: [
          {
            path: '',
            component: () => import('pages/VehicleEntries.vue')
          },
          {
            path: 'add',
            component: () => import('pages/VehicleForm.vue')
          },
          {
            path: 'edit',
            component: () => import('pages/VehicleForm.vue')
          }
        ]
      },
      {
        path: 'settings',
        component: () => import('pages/Settings.vue')
      },
      {
        path: 'support',
        component: () => import('pages/Support.vue')
      }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
