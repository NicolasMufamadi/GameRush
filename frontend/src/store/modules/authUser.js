import axios from 'axios'

const state = {
    user: null,
    auth: 'LoggedOut' 
}


const mutations = {
    setAuth(state,data){
        state.user = data 
    },

   checkauth(state,data){
       
     state.auth = data
  
  },

    logout(state){
        localStorage.removeItem('token')
        state.user = null
        state.auth = 'LoggedOut'
    }


}

const actions = {

    getauth({commit},data){
        commit('setAuth',data)
    },

    async authenticateUser({commit,state}){
        try {
            let auth = await axios.post('http://localhost:8000/users/checkauth',state.user,{
                             headers:{ 'content-type': 'text/json',
                                      'Authorization': 'Bearer'+ ' '+ localStorage.getItem('token')
                                     }
                                })   
                 console.log(auth.data)
                 commit('checkauth',auth.data.Authorization)
           
             }catch (error) {
                console.log
           }
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