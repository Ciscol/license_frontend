import Vue from 'vue'
import App from './App.vue'
import router from './router'
import http from './http'
import './css/style.css'
import './plugins/element.js'


Vue.prototype.$http = http;

Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
