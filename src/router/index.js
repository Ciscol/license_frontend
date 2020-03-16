import Vue from 'vue'
import Router from 'vue-router'
import http from '../http'
Vue.use(Router)

const routerOptions = [
  { path: '/', redirect: 'home' },
  { path: '/home', component: 'Home', meta: { title: 'HOME' } },
  { path: '/verify', component: 'Verify', meta: { isPublic: true, title: 'VERIFY' } },
  { path: '/generate', component: 'Generate', meta: { isPublic: true, title: 'GENERATE' } },
  { path: '*', component: 'NotFound', meta: { title: 'NotFound' } }
]

const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () => import(`@/components/${route.component}`)
  }
})

const router = new Router({
  routes,
  mode: 'history'
})

/* 路由监听 */
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  /* 检查token是否存在 */
  let token = localStorage.getItem("license-verification-Authorization");
  if (!to.meta.isPublic) {
    if (!token) {
      return next('/verify');
    }
    http
      .get('authCheck')
      .then(() => {
        next();
      })
      .catch(error => {
        if (error && error.response && error.response.status === 401) {
          return next('/verify');
        }
        console.log(error);
      });
  }
  else {
    next();
  }
})
export default router;