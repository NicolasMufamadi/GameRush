import axios from 'axios'

const state = {
    user: null,
}


const mutations = {
    setAuth(state,data){
        state.user = data
    },

  async checkout(state){
        try{
             let response = await axios.post('http://localhost:8000/users/checkauth',{})
             console.log('auth' + response)
            if(response){
                state.auth = true  
            }
        }catch(err){
            if(err){
                state.auth = false
            }
        }
    },

    logout(state){
        localStorage.removeItem('token')
        state.user = null
       // state.auth = false
    }


}

const actions = {

    getauth({commit},data){
        commit('setAuth',data)
    },

    checkauth({commit}){
        commit('checkout')
    },

    logout({commit}){
        commit('logout')
    }

}

const getters = {
    user: state => state.user,
    auth: state => state.auth  
}


export default {
    state,
    mutations,
    actions,
    getters
}