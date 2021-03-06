import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import { getToken, setToken } from '@/utils/auth'
// 调试模式 抛出异常到控制台

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 60000000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }
  // config.headers['Content-Type'] = 'application/json;charset=UTF-8'
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
      Message.error(res.msg)
    }
    // 网关异常统一拦截
    if (res.code === 500) {
      Message.error(res.message)
    }
    if (res.code === 107) {
      setToken(null)
      Message.error(res.message)
    }
    if (res.code === 0 && res.msg && res.msg !== 'success') {
      Message.success(res.msg)
    }
    store.dispatch('setLoading', false)
    return response
  },
  error => {
    const res = error.response
    store.dispatch('setLoading', false)
    if (res) {
      if (res.status === 478 || res.status === 403) {
        Message.error('您没有权限！')
      } else if (res.status === 400) {
        if (res.data) {
          Message.error(res.data.error_description)
        } else {
          Message.error('异常请求')
        }
      } else if (res.status === 404) {
        Message.warning('数据丢失!')
      } else if (res.status === 401) {
        Message.warning('登录过期!')
      } else if (res.status === 503) {
        Message.warning('服务异常!')
      } else {
        Message.error(res.msg)
      }
    }
  }
)

export function message(text, type, title) {
  // 关闭加载遮罩
  Message({
    title: title,
    type: type, // 主题 success/warning/info/error
    message: text, // 消息文字
    showClose: false, // 是否显示关闭按钮
    duration: 3 * 1000 // 显示时间, 毫秒。设为 0 则不会自动关闭
  })
}

export default service
