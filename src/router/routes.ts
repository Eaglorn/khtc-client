import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexLayout.vue') },
      { path: 'index', component: () => import('pages/IndexLayout.vue') },
      { path: 'login', component: () => import('pages/LoginLayout.vue') },
      // { path: 'profile', component: () => import('pages/ProfileLayout.vue') },
      { path: 'calendars', component: () => import('pages/CalendarsLayout.vue') },
      // { path: 'calendar', component: () => import('pages/CalendarLayout.vue') }
    ]
  },
  { path: '*', component: () => import('pages/Error404Layout.vue') }
];

export default routes;
