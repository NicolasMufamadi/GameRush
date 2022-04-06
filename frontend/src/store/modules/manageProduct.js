
const state = {
   product: ''
}

const mutations ={
   getproduct(state,data){
      state.product = data 
   }
}

const actions = {
   getproduct({commit},data){
       commit('getproduct',data)
   }
}

const getters = {
product: state => state.product
}

export default {
   state,
   mutations,
   actions,
   getters
}