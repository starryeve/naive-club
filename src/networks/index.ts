
/*
 * @Description:封装axios, 并使用拦截器为每个请求添加token的请求头
 * @Author: Ali
 * @Date: 2021-01-09 14:36:33
 * @LastEditors: Ali
 * @LastEditTime: 2021-03-17 21:42:03
 */

import originAxios, { AxiosRequestConfig } from 'axios'




// 1.创建axios实例，设置接口基地址和超时
const instance = originAxios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 60000 // request timeout
})

// 2.配置请求拦截器
instance.interceptors.request.use(
  config => {
    // 请求前的操作
    return config
  },
  error => {
    return error
  }
)

// 3.配置响应拦截器
instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default function request (option: AxiosRequestConfig) {
  return new Promise((resolve, reject) => {
    instance(option)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
  })
}
