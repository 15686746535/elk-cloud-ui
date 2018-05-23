import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    visitedViews: [],
    motorcycleTypeList: ['A1','A2','A3','B1','B2','C1','C2','C3','C4','M'],
    loading: false,
    spread: false,
    client: {
      height: 0, /* 页面高度*/
      width: 0 /* 页面宽度*/
    }
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    SET_SPREAD: (state, spread) => {
      state.spread = spread
    },
    SET_LOADING: (state, loading) => {
      state.loading = loading
    },
    SET_CLIENT_HEIGHT: (state, height) => {
      state.client.height = height
    },
    SET_CLIENT_WIDTH: (state, width) => {
      state.client.width = width
    },
    ADD_VISITED_VIEWS: (state, view) => {
      if (state.visitedViews.some(v => v.path === view.path)) return
      state.visitedViews.push({ name: view.name, path: view.path })
    },
    DEL_VISITED_VIEWS: (state, view) => {
      let index
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          index = i
          break
        }
      }
      state.visitedViews.splice(index, 1)
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    addVisitedViews: ({ commit }, view) => {
      commit('ADD_VISITED_VIEWS', view)
    },
    setLoading: ({ commit }, loading) => {
      commit('SET_LOADING', loading)
    },
    setSpread: ({ commit }, spread) => {
      commit('SET_SPREAD', spread)
    },
    setClientHeight: ({ commit }, height) => {
      commit('SET_CLIENT_HEIGHT', height)
    },
    setClientWidth: ({ commit }, width) => {
      commit('SET_CLIENT_WIDTH', width)
    },
    delVisitedViews: ({ commit, state }, view) => {
      return new Promise((resolve) => {
        commit('DEL_VISITED_VIEWS', view)
        resolve([...state.visitedViews])
      })
    }
  }
}

export default app
