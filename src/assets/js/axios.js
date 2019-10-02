import axios from 'axios'


// 添加响应拦截器
axios.interceptors.response.use((response) => {
  // 对响应数据做点什么
  return response;
}, (error) => {
//   Toast({
//     type: "fail",
//     message: error.response.data.message,
//     duration: 1000
//   });
  return Promise.reject(error);
});

//添加请求拦截器
axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

axios.defaults.withCredentials = true

export default axios