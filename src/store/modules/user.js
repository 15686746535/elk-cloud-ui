import { login, logout, getInfo } from '@/api/upms/login'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // Progress 进度条
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    notice: 0,
    permissions: [],
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
    SET_NOTICE: (state, notice) => {
      state.notice = notice
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
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
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const data = response.data
          if (data.code === 0 && data.roles != null && data.roles.length > 0) {
            commit('SET_ROLES', data.roles)
            commit('SET_NAME', data.username)
            commit('SET_AVATAR', data.avatar)
            commit('SET_NOTICE', data.notice)
            commit('SET_PERMISSIONS', data.permissions)
            resolve(response)
          } else {
            setToken(null)
            commit('SET_TOKEN', null)
            commit('SET_REFRESH_TOKEN', null)
            NProgress.done()
            Message.error('您没有权限！')
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
    // // 动态修改权限
    // ChangeRole({ commit }, role) {
    //   return new Promise(resolve => {
    //     commit('SET_TOKEN', role)
    //     setToken(role)
    //     getUserInfo(role).then(response => {
    //       const data = response.data.data
    //       commit('SET_ROLES', data.role)
    //       commit('SET_NAME', data.name)
    //       commit('SET_AVATAR', data.avatar)
    //       commit('SET_INTRODUCTION', data.introduction)
    //       resolve()
    //     })
    //   })
    // }

  }
}

export default user
