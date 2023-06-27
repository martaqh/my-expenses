import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/expenses',
    },
    {
      path: '/:title',
      name: 'Dashboard',
      component: () => import('@/pages/BasePage.vue'),
      props: true,
    },
    {
      path: '/:title',
      name: 'Reports',
      component: () => import('@/pages/BasePage.vue'),
      props: true,
    },
    {
      path: '/expenses',
      name: 'Expenses',
      component: () => import('@/pages/ExpensesPage.vue'),
      props: true,
    },
    {
      path: '/:title',
      name: 'Settings',
      component: () => import('@/pages/BasePage.vue'),
      props: true,
    },
    {
      path: '/:title',
      name: 'Profile',
      component: () => import('@/pages/BasePage.vue'),
      props: true,
    },
    {
      path: '/:title',
      name: 'Logout',
      component: () => import('@/pages/BasePage.vue'),
      props: true,
    },
  ],
});

export default router;
