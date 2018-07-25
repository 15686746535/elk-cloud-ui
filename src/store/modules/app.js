import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    visitedViews: [],
    iFrameUrl: 'https://www.eluchn.com', // 52.83.97.172
    motorcycleType: ['C1', 'C2', 'C3', 'C4', 'A1', 'A2', 'A3', 'B1', 'B2', 'D', 'E', 'F', 'M', 'N', 'P'],
    vehicleType: [{ name: '一人一车', value: 1 }, { name: '两人一车', value: 2 }],
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
    }
  }
}

export default app
