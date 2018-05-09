import { constantRouterMap, asyncRouterMap } from '@/router'

/**
 * 动态权限判断
 * @param menuIds  用户拥有的菜单列表
 * @param route   菜单选择
 * @returns {boolean}
 */
function hasPermission(menuIds, route) {
  let result = false
  menuIds.filter(menuId => {
    if (menuId === route.menuId) {
      result = true
    }
  })
  return result
}

/**
 * 过滤异步路由表，返回符合用户角色权限的路由表 第一级
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routerMap, menuIds) {
  routerMap.forEach(route => {
    if (route.children && route.children.length) {
      route.children = filterRouter(route.children, menuIds)
    }
    if (!route.children || !route.children.length) {
      route.alwaysShow = false
    }
  })
}
/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表 下级
 * @param asyncRouterMap
 * @param roles
 */
function filterRouter(routerMap, menuIds) {
  const accessedRouters = routerMap.filter(route => {
    if (hasPermission(menuIds, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, menuIds)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { menuIds, roles } = data
        const accessedRouters = asyncRouterMap
        if (!roles.indexOf('admins') >= 0) {
          filterAsyncRouter(asyncRouterMap, menuIds)
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
