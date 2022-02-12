import Vue from 'vue'
import Vuex from 'vuex'
import userState from './modules/userState'

Vue.use(Vuex)

const store = new Vuex.Store({

    state:{},

    mutations: {},

    actions:{},

    modules:{

        userState

    }
})

export default store
