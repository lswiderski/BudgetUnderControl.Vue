import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  { path: '/login',name: 'Login',component: () => import('../views/user/Login.vue'),},
  { path: '/register',  name:'register', component: () => import( '../views/user/Register.vue')},
  { path: '/activate', name: 'tactivate', component: () => import('../views/user/Activate.vue')},
  { path: '/terms', name: 'terms', component: () => import('../views/Terms.vue')},
  { path: '/categories',  name:'Categories', component: () => import( '../views/categories/Categories.vue')},
  { path: '/accounts',  name:'Accounts', component: () => import( '../views/accounts/Accounts.vue')},
  { path: '/tags',  name:'Tags', component: () => import( '../views/tags/Tags.vue')},
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register', '/terms', '/activate', '/about'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('jwt-token');
  const user = JSON.parse(localStorage.getItem('user'));

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  if(authRequired
     && loggedIn
     && !user.isActivated
     && to.path !== '/activate') {
    return next('/activate');
  }

  next();
})
