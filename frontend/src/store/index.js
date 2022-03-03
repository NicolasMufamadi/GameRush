import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
//import userState from './modules/userState'
import  authUser from './modules/authUser'


Vue.use(Vuex)

const store = new Vuex.Store({

    state:{},

    mutations: {},

    actions:{},

    modules:{

       
        authUser

    },
    plugins: [createPersistedState()]
})

export default store
