import { login, logout, getInfo } from '@/api/upms/login'
import { Message } from 'element-ui'
import { defaultMap, startMenuMap, appFormat } from '@/router'
import NProgress from 'nprogress' // Progress 进度条
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    permissions: [],
    defaultList: [],
    startList: [],
    appList: [],
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
    SET_APPLIST: (state, appList) => {
      state.appList = appList
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password, userInfo.randomStr, userInfo.code).then(response => {
          const data = response.data
          console.log(response)
          setToken(data.access_token)
          commit('SET_TOKEN', data.access_token)
          commit('SET_REFRESH_TOKEN', data.refresh_token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const data = response.data
          if (data.code === 0 && data.roles != null && data.roles.length > 0) {
            commit('SET_ROLES', data.roles)
            commit('SET_NAME', data.username)
            commit('SET_AVATAR', data.avatar)
            commit('SET_NOTICE', data.notice)
            commit('SET_PERMISSIONS', data.permissions)
            // 模拟数据  正式需要从后台返回
            var testMap = [
              {
                id: 123,
                name: '学员管理',
                content: 'modules/stu/student',
                icon: 'icon_one_note',
                msgCount: 0,
                childItem: []
              },
              {
                id: 456,
                name: '学员缴费',
                content: 'modules/stu/serviceNote',
                icon: 'icon_one_note',
                msgCount: 0,
                childItem: []
              },
              {
                id: 789,
                name: '考试安排',
                content: 'modules/stu/batch',
                icon: 'icon_one_note',
                msgCount: 0,
                childItem: []
              },
              {
                id: 777,
                name: '成绩登记',
                content: 'modules/stu/grade',
                icon: 'icon_one_note',
                msgCount: 0,
                childItem: []
              },
              {
                id: 888,
                name: '毕业学员',
                content: 'modules/stu/graduation',
                icon: 'icon_one_note',
                msgCount: 0,
                childItem: []
              },
              {
                id: 999,
                name: '学员回访',
                content: 'modules/stu/revisit',
                icon: 'icon_one_note',
                msgCount: 0,
                childItem: []
              }
            ]
            commit('SET_APPLIST', appFormat(testMap))
            commit('SET_STARTLIST', startMenuMap)
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
