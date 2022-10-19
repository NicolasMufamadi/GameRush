
const axios = require('axios')


const state = {

    Cart: [],
    cartItems: [],
    cartItem: {},
    cartTotal: 0,
    nItems: 0,
    checkoutStatus: true  

}

const mutations = {

   async setCart(state,data){
       
      state.Cart = data
      state.nItems = 0 

      for(let i = 0; i < state.Cart.length; i++){
         state.nItems += state.Cart[i].ProductQuantity
      }
      
   },

   async setProducts(state,cart){
       
       let checkProduct = state.cartItems.find(({ProductId})=> ProductId == cart.ProductId)
       if(checkProduct === undefined){
          state.cartItems.push(cart)
       }
       
       state.cartTotal = 0   
       for(let i = 0; i < state.cartItems.length; i++){
           state.cartTotal += state.cartItems[i].ProductPrice * state.cartItems[i].itemsInCart
       }
       

   },

   incrementItems(state){
       state.nItems += 1
   },

   checkout(state){
       for(let i = 0; i < state.cartItems.length; i++){
         if(state.cartItems[i].itemsInCart > state.cartItems[i].ProductQuant){
            state.checkoutStatus = false 
         }else{
            state.checkoutStatus = true
         }
       }

   },

    clearCart(state){
        state.Cart = []
        state.cartItems = []
        state.nItems = 0
        state.cartTotal = 0
    }

}

const actions = {
   
 
   async getCart({commit},data){
        try {
            let cart = await axios.get('http://localhost:8000/cart/getcart',{params:{UserId: data.UserId, ProductId: data.ProductId}})
            commit('setCart',cart.data)
           
        } catch (error) {
            console.log
        }
    },

    async addProduct({commit,dispatch,state},data){
         state.cartItems = []
        try {
               await dispatch('getCart',data)
              
               for(let i =0; i < state.Cart.length; i++){
                let product = await axios.get('http://localhost:8000/products/getproduct/'+state.Cart[i].ProductId)
                let item = product.data
                let  obj = {...item, itemsInCart: state.Cart[i].ProductQuantity}
                commit('setProducts',obj)
            }
        } catch (error) {
            console.log
        }
    },

    async removeCart({commit},user){
        try{
            let carts = await axios.delete('http://localhost:8000/cart/clearcart',{params: {UserId: user}}) 
            
                console.log(carts)
                      commit('clearCart')
        
        }catch(e){
            console.log()
        }
    },

    increment({commit}){
       commit('incrementItems')
    },

    checkout({commit}){
       commit('checkout')
    },
   
    clearCart({commit}){
       commit('clearCart')
      }
   }

const getters = {
   Cart: state => state.Cart,
   cartItems: state => state.cartItems,
   cartTotal: state => state.cartTotal,
   nItems: state => state.nItems,
   checkoutStatus: state => state.checkoutStatus
}

export default {
    state,
    mutations,
    actions,
    getters
}