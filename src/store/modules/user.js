import { login, logout, getInfo } from '@/api/upms/login'
import { Message } from 'element-ui'
import { defaultMap, startFilter, hasAppFilter, showAppFilter, desktopFilter } from '@/router'
import NProgress from 'nprogress' // Progress 进度条
import { getToken, setToken, removeToken } from '@/utils/auth'

export function showMonitor(desktopList, newlist) {
  console.log(desktopList)
  console.log(newlist)
  var isUp = false
  if (desktopList.length === newlist.length) {
    desktopList.forEach(function(item, index) {
      if (item.id !== newlist[index].id || item.desktop !== newlist[index].desktop) {
        isUp = true
      }
    })
  } else {
    isUp = true
  }
  return isUp
}
const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    desktopBg: '',
    permissions: [],
    defaultList: [],
    intention: {},
    startList: [],
    menuIds: [], // 拥有的菜单id
    desktopOneList: [], // 桌面1显示的菜单
    desktopTwoList: [], // 桌面2显示的菜单
    desktopList: null, // desktopOneList + desktopTwoList
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
    },
    SET_DESKTOPLIST: (state, desktopList) => {
      state.desktopList = desktopList
    },
    SET_INTENTION: (state, intention) => {
      state.intention = intention
    }
  },

  actions: {
    setIntention: ({ commit }, intention) => {
      commit('SET_INTENTION', intention)
    },
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
    SetDesktopABg: ({ commit }, bg) => {
      commit('SET_DESKTOPBG', bg) // 桌面背景
    },
    SetDesktopApp: ({ commit, state }, list) => {
      var desktopList = state.desktopList
      commit('SET_DESKTOPONELIST', desktopFilter(list, '1'))
      commit('SET_DESKTOPTWOLIST', desktopFilter(list, '2'))
      if (desktopList) {
        console.log('修改')
        if (showMonitor(desktopList, list)) {
          console.log('修改2')
          commit('SET_DESKTOPLIST', list)
        }
      } else {
        commit('SET_DESKTOPLIST', list)
      }
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
            var hasAppList = hasAppFilter(data.menuIds, data.roles)
            var showApps = showAppFilter(hasAppList, data.showApp)
            if (data.showApp && data.showApp.length > 0) {
              commit('SET_DESKTOPONELIST', desktopFilter(showApps, '1'))
              commit('SET_DESKTOPTWOLIST', desktopFilter(showApps, '2'))
            } else {
              commit('SET_DESKTOPONELIST', hasAppList)
            }
            commit('SET_HASAPPLIST', hasAppList) // 拥有的app
            commit('SET_STARTLIST', startFilter(hasAppList)) // 开始菜单
            // 需要后台查询
            defaultMap[0].msgCount = data.agencyList[1] || 0 // 短消息 data.agencyList[0]
            defaultMap[1].msgCount = 0 // 工作日志
            defaultMap[2].msgCount = data.agencyList[0] || 0 // 我的待办
            defaultMap[3].msgCount = 0 // 任务管理
            commit('SET_DEFAULTLIST', defaultMap)// 快速启动
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
