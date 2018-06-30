import { login, logout, getInfo } from '@/api/upms/login'
import { Message } from 'element-ui'
import { defaultMap, startFilter, hasAppFilter, showAppFilter, desktopFilter } from '@/router'
import NProgress from 'nprogress' // Progress 进度条
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    desktopBg: '',
    permissions: [],
    defaultList: [],
    startList: [],
    menuIds: [], // 拥有的菜单id
    desktopOneList: [], // 桌面1显示的菜单
    desktopTwoList: [], // 桌面2显示的菜单
    hasAppList: [], // 拥有的菜单
    roles: []
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_REFRESH_TOKEN: (state, rfToken) => {
      state.refresh_token = rfToken
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_DESKTOPBG: (state, desktopBg) => {
      state.desktopBg = desktopBg
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    },
    SET_DEFAULTLIST: (state, defaultList) => {
      state.defaultList = defaultList
    },
    SET_STARTLIST: (state, startList) => {
      state.startList = startList
    },
    SET_MENUIDS: (state, menuIds) => {
      state.menuIds = menuIds
    },
    SET_HASAPPLIST: (state, hasAppList) => {
      state.hasAppList = hasAppList
    },
    SET_DESKTOPONELIST: (state, desktopOneList) => {
      state.desktopOneList = desktopOneList
    },
    SET_DESKTOPTWOLIST: (state, desktopTwoList) => {
      state.desktopTwoList = desktopTwoList
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password, userInfo.randomStr, userInfo.code).then(response => {
          const data = response.data
          setToken(data.access_token)
          commit('SET_TOKEN', data.access_token)
          commit('SET_REFRESH_TOKEN', data.refresh_token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    SetDesktopApp: ({ commit }, list) => {
      commit('SET_DESKTOPONELIST', desktopFilter(list, '1'))
      commit('SET_DESKTOPTWOLIST', desktopFilter(list, '2'))
    },
    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const data = response.data
          if (data.code === 0 && data.roles != null && data.roles.length > 0) {
            commit('SET_ROLES', data.roles)
            commit('SET_DESKTOPBG', data.desktopBg || '01-1') // 桌面背景
            commit('SET_NAME', data.username)
            commit('SET_AVATAR', data.avatar)
            commit('SET_MENUIDS', data.menuIds)
            commit('SET_PERMISSIONS', data.permissions)
            // 测试
            data.showApp = [
              {
                id: 2,
                userId: 1,
                menuId: 20800, // 回访信息
                desktop: '1', // 桌面1
                sort: 0
              },
              {
                id: 2,
                userId: 1,
                menuId: 20101, // 学员添加
                desktop: '2', // 桌面2
                sort: 1
              },
              {
                id: 2,
                userId: 1,
                menuId: 20900, // 学费收取
                desktop: '1', // 桌面1
                sort: 2
              },
              {
                id: 1,
                userId: 1,
                menuId: 20100, // 学员管理
                desktop: '1', // 桌面1
                sort: 3
              },
              {
                id: 2,
                userId: 1,
                menuId: 20300, // 考试安排
                desktop: '2', // 桌面1
                sort: 4
              },
              {
                id: 2,
                userId: 1,
                menuId: 20400, // 成绩登记
                desktop: '1', // 桌面1
                sort: 5
              },
              {
                id: 2,
                userId: 1,
                menuId: 20600, // 毕业学员
                desktop: '1', // 桌面1
                sort: 6
              },
              {
                id: 2,
                userId: 1,
                menuId: 20700, // 学员回访
                desktop: '2', // 桌面2
                sort: 7
              }
            ]
            var hasAppList = hasAppFilter(data.menuIds, data.roles)
            if (data.showApp && data.showApp.length > 0) {
              var showApp = showAppFilter(hasAppList, data.showApp)
              commit('SET_DESKTOPONELIST', desktopFilter(showApp, '1'))
              commit('SET_DESKTOPTWOLIST', desktopFilter(showApp, '2'))
            } else {
              commit('SET_DESKTOPONELIST', hasAppList)
            }
            commit('SET_HASAPPLIST', hasAppList)
            commit('SET_STARTLIST', startFilter(hasAppList))
            commit('SET_DEFAULTLIST', defaultMap)
            resolve(response)
          } else {
            Message.error('您没有权限！')
            logout(state.token, state.refresh_token).then(() => {
              commit('SET_TOKEN', '')
              commit('SET_REFRESH_TOKEN', '')
              commit('SET_ROLES', [])
              NProgress.done()
              removeToken()
              resolve()
            }).catch(error => {
              reject(error)
            })
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({ commit, state }) {
      console.log(123)
      return new Promise((resolve, reject) => {
        logout(state.token, state.refresh_token).then(() => {
          console.log(123)
          commit('SET_TOKEN', '')
          commit('SET_REFRESH_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
