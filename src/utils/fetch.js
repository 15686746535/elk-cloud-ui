import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  // api的base_url
  // baseURL: process.env.BASE_API,
  // 请求超时时间
  timeout: 5000
})

// request拦截器
service.interceptors.request.use(config => {
  // Do something before request is sent
  if (store.getters.token) {
    config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code == 1) {
      message(res.msg, 'error')
      return Promise.reject(res)
    }
    return response
  },
  error => {
    const res = error.response
    if (res.status == 478) {
      message(res.status + '： ' + res.data.data, 'error')
    } else if (res.status == 400) {
      message(res.status + '： ' + res.data.error_description, 'error')
    } else {
      message(res.status + '： ' + res.data.message, 'error')
    }
    return Promise.reject(error)
  }
)

export function message(text, type) {
  Message({
    message: text,
    type: type,
    duration: 5 * 1000
  })
}

export default service

