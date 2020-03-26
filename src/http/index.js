import axios from 'axios'
import Vue from 'vue'
import router from '../router'

const http = axios.create({
  baseURL: 'http://localhost:5000/api'
})

/* axios拦截器 */
// 请求头添加token信息
http.interceptors.request.use(config => {
  let token = localStorage.getItem('license-verification-Authorization');
  if (token) {
    // config.headers.Authorization = token;
    config.headers.Authorization = 'Bearer ' + token;
  }
  return config;
}, err => {
  return Promise.reject(err);
});

// 响应信息拦截 这里还要做token验证返回结果处理
http.interceptors.response.use(res => {
  return res;
}, err => {
  // 错误信息弹出
  if (err.response.data && err.response.data.message) {
    Vue.prototype.$alert(err.response.data.message, 'ERROR', {
      confirmButtonText: '确定'
    });
  }
  // 登录失败，跳转到登录页
  if (err.response.status === 401) {
    localStorage.removeItem('license-verification-Authorization');
    Vue.prototype.$message({
      showClose: true,
      message: '登录失效，即将跳转至登录页面',
      type: 'error'
    });
    setTimeout(() => {
      router.push('/verify');
    }, 3000)
  }
  return Promise.reject(err);
})
export default http;