const state = {
    user: null
};

const mutations = {

  user(state,token){ 

    if(localStorage.getItem('token') != null){
         state.user = token 
    }else{
      state.user = null
    }

  }

};

const actions = {

   user({commit},token){
     commit('user',token)
   }

};

const getters = {

  user: state => state.user

};

export default {

  //  namespaced: true,
    state,
    mutations,
    actions,
    getters
}