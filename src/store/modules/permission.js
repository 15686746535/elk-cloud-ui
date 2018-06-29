import { appMap } from '@/router'

/**
 * 动态权限判断
 * @param menuIds  用户拥有的菜单列表
 * @param route   菜单选择
 * @returns {boolean}
 */
// function hasPermission(menuIds, route) {
//   let result = false
//   menuIds.filter(menuId => {
//     if (menuId === route.menuId) {
//       result = true
//     }
//   })
//   return result
// }

/**
 * 过滤过滤 admins 角色
 * @param asyncRouterMap
 * @param roles
 */
// function filterAsyncRouter(routerMap, data) {
//   const menuIds = data.menuIds
//   const roles = data.roles
//   // admin 拥有全部
//   if (roles && roles.indexOf('admins') === -1) {
//     filterRouter(routerMap, menuIds)
//   }
//   return routerMap
// }
/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
// function filterRouter(routerMap, menuIds) {
//   routerMap.forEach(function(route) {
//     route.isShow = hasPermission(menuIds, route)
//     if (route.children) {
//       filterRouter(route.children, menuIds)
//     }
//   })
// }

const permission = {
  state: {
    routers: null
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.routers = routers
    }
  },
  actions: {
    GenerateRoutes({ commit }) {
      return new Promise(resolve => {
        commit('SET_ROUTERS', appMap)
        resolve()
      })
    }
  }
}

export default permission
