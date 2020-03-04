import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const routerOptions = [
  { path: '/', redirect: 'Home' },
  { path: '/home', component: 'Home' },
  { path: '/verify', component: 'Verify' },
  { path: '*', component: 'NotFound' }
]

const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () => import(`@/components/${route.component}.vue`)
  }
})

export default new Router({
  routes,
  mode: 'history'
})