import { login, getInfo, logout, giteeLogin } from '@/api/myServer.js'
import { getToken, setToken, removeToken } from '@/utils/auth'
// import router from '@/router'
// import { mockLogin } from '@/api/sys'

const state = {
  token: getToken(),
  name: '',
  //   avatar: '',
  //   introduction: '',
  //   roles: [],
  userInfo: {},
  //   userInfoDefine: {}
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
    // setToken(token)
  },
  //   SET_INTRODUCTION: (state, introduction) => {
  //     state.introduction = introduction
  //   },
  SET_NAME: (state, name) => {
    state.name = name
  },
  //   SET_AVATAR: (state, avatar) => {
  //     state.avatar = avatar
  //   },
  //   SET_ROLES: (state, roles) => {
  //     state.roles = roles
  //     console.log(roles, 'toles')
  //   },
  SET_USER_DATA: (state, userInfo) => {
    state.userInfo = userInfo
  },
  //   SET_USER_INFO_DEFINE: (state, userInfo) => {
  //     state.userInfoDefine = userInfo
  //   }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo)
        .then(response => {
          // if (response.code === 0 && response.define.bindFlag) {
          if (response.code === 0) {
            commit('SET_TOKEN', response.msg)
            setToken(response.msg)
          }
          // const token = response.token_type + ' ' + response.access_token
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  giteeLogin({ commit }, code) {
    return new Promise((resolve, reject) => {
      giteeLogin(code)
        .then(response => {
          if (response.code === 0) {
            commit('SET_TOKEN', response.msg)
            setToken(response.msg)
          }
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  updateUser({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {

        if (!response.data) {
          reject('Verification failed, please Login again.')
        }
        const { data } = response
        // Desc: avatar 头像
        // Desc: introduction 介绍

        // commit('SET_AVATAR', avatar)
        commit('SET_USER_DATA', data)
        resolve('ok')
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          commit('SET_TOKEN', '')
          commit('SET_USER_DATA', {})
          removeToken()
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_USER_DATA', {})
      removeToken()
      resolve()
    })
  },

  //   mockLogin({ commit }, id) {
  //     return new Promise((resolve, reject) => {
  //       mockLogin(id).then(res => {
  //         if (res.msg) {
  //           commit('SET_TOKEN', res.msg)
  //           setToken(res.msg)
  //           resolve()
  //         } else {
  //           reject()
  //         }
  //       })
  //     })
  //   },

  // dynamically modify permissions
  //   async changeRoles({ commit, dispatch }, role) {
  //     const token = role + '-token'

  //     commit('SET_TOKEN', token)

  //     setToken(token)

  //     const { roles } = await dispatch('getInfo')

  //     // generate accessible routes map based on roles
  //     const accessRoutes = await dispatch('permission/generateRoutes', roles, {
  //       root: true
  //     })
  //     // dynamically add accessible routes
  //     router.addRoutes(accessRoutes)

  //     // reset visited views and cached views
  //     dispatch('tagsView/delAllViews', null, { root: true })
  //   }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
