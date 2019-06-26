import axios from 'axios'
const Http = {}
Http.install = function (Vue) {
  Vue.prototype.$http = axios
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';
  axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // console.log("拦截器被触发了-----");
    // console.log(config.url);

    // 如果拦截到的请求不是登录 设置头部
    if (config.url !== 'login') {
      const AUTH_TOKEN = localStorage.getItem("token");
      // this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      config.headers.Authorization = AUTH_TOKEN;
      
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
}
export default Http
