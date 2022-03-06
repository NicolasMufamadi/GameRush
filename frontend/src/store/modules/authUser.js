
const state = {
    user: null,
}


const mutations = {
    setAuth(state,data){
        state.user = data
    },

    logout(state){
        localStorage.removeItem('token')
        state.user = null
    }
}

const actions = {

    getauth({commit},data){
        commit('setAuth',data)
    },

    logout({commit}){
        commit('logout')
    }

}

const getters = {
    user: state => state.user,
}


export default {
    state,
    mutations,
    actions,
    getters
}