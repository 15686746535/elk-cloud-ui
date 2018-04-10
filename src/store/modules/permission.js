import { constantRouterMap, setComponent } from '@/router'

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
        const menus = data.menus
        setComponent(menus)
        commit('SET_ROUTERS', menus)
        resolve()
      })
    }
  }
}

export default permission
