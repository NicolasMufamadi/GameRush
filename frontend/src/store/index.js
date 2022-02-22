import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import userState from './modules/userState'


Vue.use(Vuex)

const store = new Vuex.Store({

    state:{},

    mutations: {},

    actions:{},

    modules:{

        userState

    },
    plugins: [createPersistedState()]
})

export default store
