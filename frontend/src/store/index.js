import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import manageProduct from './modules/manageProduct'
import  authUser from './modules/authUser'


Vue.use(Vuex)

const store = new Vuex.Store({

    state:{},

    mutations: {},

    actions:{},

    modules:{

        authUser,
        manageProduct

    },
    plugins: [createPersistedState()]
})

export default store
