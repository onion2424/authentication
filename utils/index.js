const state = () => ({
    user: null,
  })
  
  const mutations = {
    SET_USER(state, user) {
      state.user = user
    }
  }
  
  const actions = {
    async onAuthStateChangedAction(state, { authUser, claims }) {
      console.log('heyhey');
    if (!authUser) {
      // authされていない場合
      state.commit('SET_USER', null)
  
      // リダイレクトの設定
      this.$router.push({
        path: '/auth/aignin',
      })
    } else {
      // authされている場合
      const { uid, email } = authUser
      state.commit('SET_USER', {
        uid,
        email,
      })
    }
  }
  }
  
  const getters = {
    getUser(state) {
      return state.user
    }
  }
  
  export default {
    state,
    mutations,
    actions,
    getters,
  }

