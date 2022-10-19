const state = {
   Address: null
}


const mutations = {
    getAddress(state,data){
        state.Address = data 
    },
    
    clearAddressState(state){
        state.Address = null
    }
}

const actions ={
   getAddress({commit},data){
       commit('getAddress',data)
   },

   clearAddressState({commit}){
       commit('clearAddressState')
   }
}

const getters = {
    Address: state => state.Address
}

export default{
    state,
    actions,
    mutations,
    getters,
}