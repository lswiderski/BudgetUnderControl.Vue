import Vue from 'vue';
import Router from 'vue-router';

import Home from '../views/Home';
import LoginPage from '../components/login/LoginPage'
import RegisterPage from '../components/register/RegisterPage'
import ActivatePage from '../components/login/ActivatePage'
import Categories from '../components/categories/Categories'
import Users from '../components/users/Users'
import User from '../components/users/User'
import Accounts from '../components/accounts/Accounts'
import Transactions from '../components/transactions/Transactions'
import Tags from '../components/tags/Tags'
import MovingSumReport from '../components/reports/MovingSumReport'
import Map from '../components/maps/Map'
Vue.use(Router);

let router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/activate', component: ActivatePage},
    { path: '/categories', component: Categories },
    { path: '/users', component: Users },
    { path: '/user/:id', component: User },
    { path: '/accounts', component: Accounts },
    { path: '/transactions', component: Transactions },
    { path: '/tags', component: Tags },
    { path: '/report/movingsum', component: MovingSumReport },
    { path: '/map', component: Map},
    { path: '/terms', name: 'terms', component: () => import('../views/Terms.vue') },
    {  path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue') },

    // otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
});
export default router
router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register', '/terms', '/activate'];
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

  const adminOnlyPages = ['/users', '/users'];
  const adminRequired = adminOnlyPages.includes(to.path);

  if(adminRequired && !user.isAdmin)
  {
    return next('/');
  }

  next();
})