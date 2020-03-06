import Vue from 'vue'
import Router from 'vue-router'
import http from '../http'
Vue.use(Router)

const routerOptions = [
  { path: '/', redirect: 'home' },
  { path: '/home', component: 'Home' },
  { path: '/verify', component: 'Verify', meta: { isPublic: true } },
  { path: '*', component: 'NotFound' }
]

const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () => import(`@/components/${route.component}.vue`)
  }
})

const router = new Router({
  routes,
  mode: 'history'
})

/* 路由监听，检查token是否存在 */
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("license-verification-Authorization");
  if (!to.meta.isPublic) {
    if (!token) {
      return next('/verify');
    }
    http
      .get('authCheck')
      .catch(error => {
        if (error && error.response && error.response.status === 401) {
          return next('/verify');
        }
        console.log(error);
      });
  }
  next();
})
export default router;