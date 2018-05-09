import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { getToken } from '@/utils/auth'

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => { // 开启Progress
  console.log('======================')
  console.log(to)
  NProgress.start()
  if (getToken()) { // 判断是否有token
    if (to.path === '/login') {
      next({ path: '/dashboard' })
    } else {
      if (!store.getters.roles || store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          const data = res.data
          if (data.code === 500) {
            store.dispatch('FedLogOut').then(() => {
              console.log('验证失败,请重新登录')
              next({ path: '/login' })
            })
          } else {
            const menuIds = data.menuIds
            const roles = data.roles
            console.log('menuIds')
            console.log(menuIds)
            store.dispatch('GenerateRoutes', { menuIds, roles }).then(() => { // 生成可访问的路由表
              router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
              if (to.path === '/') {
                next({ path: '/dashboard' })
              } else {
                next({ ...to }) // hack方法 确保addRoutes已完成
              }
            })
          }
        }).catch((e) => {
          store.dispatch('FedLogOut').then(() => {
            console.log('验证失败,请重新登录')
            next({ path: '/login' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
    }
  }
})

router.afterEach(() => {
  console.log('=================afterEach==========')
  NProgress.done() // 结束Progress
})
