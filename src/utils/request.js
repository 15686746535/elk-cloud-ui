import axios from 'axios'
import { Notification } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
// 调试模式 抛出异常到控制台
const debug = true

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 500) {
      message(res.msg, 'error', '提示')
      if (debug) return Promise.reject(res)
    }
    // 网关异常统一拦截
    if (res.status === 500) {
      message(res.message, 'error', '提示')
      if (debug) return Promise.reject(res)
    }
    console.log('00000000000000000000000000000000000')
    console.log(res)
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
      console.log(res)
      message('登录过期!', 'warning', '警告')
    } else {
      message(res.msg, 'error', '错误')
    }
    if (debug) return Promise.reject(error)
  }
)

export function message(text, type, title) {
  // 关闭加载遮罩
  store.dispatch('setLoading', false)
  Notification({
    title: title,
    type: type,
    message: text,
    duration: 3 * 1000
  })
}

export default service
