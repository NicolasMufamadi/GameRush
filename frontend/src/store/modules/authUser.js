//import axios from 'axios'

const state = {
    user: null
}


const mutations = {
    setAuth(state,data){
        state.user = data
    },
/*
   async setuser(state,Id){
    
        await axios.get(`http://localhost:8000/users/getuser/${Id}`)
        .then(data=>{
            state.user = data.data
        }).catch(err=>{
            console.log(err)
        })

    },
*/
    logout(state){
        state.user = null
    }
}

const actions = {

    getauth({commit},data){
        commit('setAuth',data)
    },
/*
    getuser({commit},Id){
       commit('setuser',Id)
    },
*/
    logout({commit}){
        commit('logout')
    }

}

const getters = {
    user: state => state.user 
}


export default {
    state,
    mutations,
    actions,
    getters
}