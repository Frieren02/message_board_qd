const state = {
  theme: 0, // 0深色，1浅色
  mainType: 'word_msg',
}

const mutations = {
  SET_THEME: (state, theme) => {
    state.theme = theme
  },
  SET_MAINTYPE: (state, mainType) => {
    state.mainType = mainType
  }
}

const actions = {
  changeTheme({ commit }, theme) {
    commit('SET_THEME', theme)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
