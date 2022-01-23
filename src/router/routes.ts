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
        component: () => import('src/pages/RefuelIndex.vue'),
        children: [
          {
            path: '',
            component: () => import('src/pages/RefuelEntries.vue')
          },
          {
            path: 'add',
            component: () => import('src/pages/RefuelForm.vue')
          },
          {
            path: 'edit',
            component: () => import('src/pages/RefuelForm.vue')
          },
          {
            path: 'filter',
            component: () => import('src/pages/FilterRefuelEntriesForm.vue')
          }
        ]
      },
      {
        path: '/vehicles',
        component: () => import('src/pages/VehicleIndex.vue'),
        children: [
          {
            path: '',
            component: () => import('src/pages/VehicleEntries.vue')
          },
          {
            path: '/vehicles/add',
            component: () => import('src/pages/VehicleForm.vue')
          },
          {
            path: 'edit',
            component: () => import('src/pages/VehicleForm.vue')
          }
        ]
      },
      {
        path: 'settings',
        component: () => import('src/pages/Settings.vue')
      },
      {
        path: 'support',
        component: () => import('src/pages/Support.vue')
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
