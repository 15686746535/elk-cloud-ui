import { constantRouterMap, setComponent } from '@/router'
import { findMenuByRole } from '@/api/upms/menu'

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
        findMenuByRole().then(response => {
          var myMenus = response.data.data
          setComponent(myMenus)
          commit('SET_ROUTERS', myMenus)
          resolve()
        })
      })
    }
  }
}

export default permission
