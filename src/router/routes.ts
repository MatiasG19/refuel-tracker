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
        path: 'refuel-form', 
        component: () => import('src/pages/RefuelForm.vue') 
      },
      { 
        path: 'filter-refuel-entries-form', 
        component: () => import('src/pages/FilterRefuelEntriesForm.vue') 
      },
      { 
        path: 'refuel-entries', 
        component: () => import('src/pages/RefuelEntries.vue') 
      },
      { 
        path: 'vehicle-entries', 
        component: () => import('src/pages/VehicleEntries.vue') 
      },
      { 
        path: 'vehicle-form', 
        component: () => import('src/pages/VehicleForm.vue') 
      },
      { 
        path: 'settings', 
        component: () => import('src/pages/Settings.vue') 
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
