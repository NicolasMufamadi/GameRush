/*import axios from 'axios'


const state = {
   isLoggedIn: null,
   user: {},
   UserId: null,
  // isAdmin: false
};

const mutations = {

   login(state,token){ 

    if(localStorage.getItem('token') != null){
         state.isLoggedIn = token 
    }else{
      state.isLoggedIn = null
    }

    
  },
  
  setUserId(state,Id){
     if(localStorage.getItem('UserId') != undefined || localStorage.getItem('UserId') !==null){
       state.UserId = Id
     }else{
       state.UserId = null
     }
  },

  async getuser(state){
    
    await axios.get(`http://localhost:8000/users/getuser/${state.UserId}`)
    .then(data=>{
         state.user = data.data
       
     //    if(state.user.UserType == 'Admin'){
      //     state.isAdmin = true
      //   }else{
       //    state.isAdmin = false
        // }

    }).catch(err=>{
      if(localStorage.getItem('UserId') == null){
         state.user = {}
      }
      console.log(err)
    })
  },


};

const actions = {

   userToken({commit},token){
     commit('login',token)
   },

   getUserId({commit},Id){
     commit('setUserId',Id)
   },

   user({commit}){
     commit('getuser')
   },
 
};

const getters = {

  isLoggedIn: state => state.isLoggedIn,
  user: state => state.user,
  UserId: state => state.UserId,
 // isAdmin: state => state.isAdmin

};

export default {

  //  namespaced: true,
    state,
    mutations,
    actions,
    getters
}*/