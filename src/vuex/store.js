import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showMenu: true,
    articleList: [
      {
        content: '装修代码编辑',
        current: true
      }
    ]
  },
  mutations: {
    SHOW_MENU (state) {
      state.showMenu = state.showMenu === false
    }
  },
  actions: {
    showMenu ({commit}) {
      commit('SHOW_MENU')
    }
  },
  getters: {
    articleList: state => {
      return state.articleList
    }
  }
})
