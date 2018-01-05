import { constantRouterMap } from '@/router'
import menus from './menu'

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
    GenerateRoutes({ commit }) {
      return new Promise(resolve => {
        console.log(menus.state.menus)
        commit('SET_ROUTERS', menus.state.menus)
        resolve()
      })
    }
  }
}

export default permission
