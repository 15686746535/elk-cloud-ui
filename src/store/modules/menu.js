import { findMenuByRole } from '@/api/upms/menu'
import { getMenuTree } from '@/utils/tree'

const menu = {
  state: {
    menus: []
  },
  mutations: {
    SET_MENUS: (state, menus) => {
      state.menus = menus
    }
  },
  actions: {
    GenerateMenus({ commit }, data) {
      return new Promise((resolve, reject) => {
        const { roles } = data
        findMenuByRole(roles[0]).then(response => {
          const myMenus = getMenuTree(response.data.data, -1)
          commit('SET_MENUS', myMenus)
          console.log('SET_MENUS')
          console.log(response.data.data)
          console.log(myMenus)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default menu
