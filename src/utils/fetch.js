import axios from 'axios'
import { Notification } from 'element-ui'
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
    if (res.code === 1) {
      message(res.msg, 'error', '提示')
      return Promise.reject(res)
    }
    return response
  },
  error => {
    const res = error.response
    if (res.status === 478 || res.status === 403) {
      message('您没有权限！', 'error', '错误')
    } else if (res.status === 400) {
      message('服务器异常!', 'error', '错误')
    } else if (res.status === 404) {
      message('数据丢失!', 'warning', '警告')
    } else if (res.status === 401) {
      message('登录过期!', 'warning', '警告')
    } else {
      message('未知异常，请联系管理员!', 'error', '错误')
    }
    return Promise.reject(error)
  }
)

export function message(text, type, title) {
  Notification({
    title: title,
    type: type,
    message: text,
    duration: 3 * 1000
  })
}

export default service

