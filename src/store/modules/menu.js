import { findMenuByRole } from '@/api/menu'
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
        console.log(roles[0])
        findMenuByRole(roles[0]).then(response => {
          console.log('GenerateMenus')
          console.log(response)
          const myMenus = getMenuTree(response.data.data, -1)
          commit('SET_MENUS', myMenus)
          resolve()
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    }
  }
}

export default menu
