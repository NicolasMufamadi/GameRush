import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import manageProduct from './modules/manageProduct'
import manageAddress from './modules/manageAddress'
import authUser from './modules/authUser'
import Cart from './modules/cart'
import Report from './modules/report'

Vue.use(Vuex)

const store = new Vuex.Store({

    state:{},

    mutations: {},

    actions:{},

    modules:{

        authUser,
        manageProduct,
        manageAddress,
        Cart,
        Report

    },
    plugins: [createPersistedState()]
})

export default store
