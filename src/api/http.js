import axios from 'axios'
import {Message} from 'element-ui'
var instance = axios.create();
instance.defaults.timeout = 5000;

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

  

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    const res = response.data
    
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
// 如果你想在稍后移除拦截器，可以这样：

var myInterceptor = axios.interceptors.request.use(function () {/*...*/});
axios.interceptors.request.eject(myInterceptor);
// 可以为自定义 axios 实例添加拦截器

var instance = axios.create();
instance.interceptors.request.use(function () {/*...*/});