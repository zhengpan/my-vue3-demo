import axios, { AxiosRequestConfig,AxiosResponse } from "axios";
import { getStorage } from './index'

const server = axios.create({
  headers: {},
  baseURL: "/api/v1",
  withCredentials:true
})
// 添加请求拦截器
server.interceptors.request.use(function (config:AxiosRequestConfig) {
  // 在发送请求之前做些什么
  if (config && config.headers) {
    config.headers['authorization'] = 'Bearer ' + getStorage('token')
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
server.interceptors.response.use(function (response:AxiosResponse) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default server