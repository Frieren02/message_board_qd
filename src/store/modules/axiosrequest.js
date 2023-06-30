const state = {
  cancelTokenList: []
}

const mutations = {
  addCancelToken(state, payload) {
    state.cancelTokenList.push(payload)
  },
  deleteCancelToken(state, index) {
    state.cancelTokenList.splice(index, 1)
  }
}

const actions = {
  
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
