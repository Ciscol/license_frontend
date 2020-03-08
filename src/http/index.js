import axios from 'axios'
// import Vue from 'vue'
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
    alert(err.response.data.message)
    
    // element 用到的
    // Vue.prototype.$message({
    //   type: 'error',
    //   message: err.response.data.message
    // })
    }
    if (err.response.status === 401) {
      alert('401 (UNAUTHORIZED)')
      router.push('/verify');
      return;
    }
  // 登录失败，跳转到登录页
  // if (err.response.status === 401) {
  //   router.push('/login');
  // }
  return Promise.reject(err);
})


export default http;