import axios from "axios"
import qs from 'querystring' 

const state = {
   product: '',
   products: []
}

const mutations ={
   
   getproduct(state,data){
      state.product = data 
   }, 

   getProducts(state,data){
      state.products = data 
   },

}

const actions = {
   async getproduct({commit},data){

       commit('getproduct',data)
   
   },

   async getProducts({commit,dispatch},query){

       try {
              let data = await axios.get('http://localhost:8000/products/getproducts?'+ qs.stringify(query,true))
               console.log(query) 
              commit('getProducts',data.data)
              dispatch('updateProduct')
       } catch (error) {
         console.log(error)
       }
   },

   async updateProduct({state}){
      
      for(let i = 0; i < state.products.length; i++){
         if(state.products[i].ProductQuant === 0){
          
            try {
                   let product = await axios.put('http://localhost:8000/products/updateproduct/'+state.products[i].ProductId,
                                             {ProductStatus: 'Out-Of-Stock'})
                 console.log(product)
            } catch (error) {
               console.log(error)
            }
         }else {
            try {
                 let product = await axios.put('http://localhost:8000/products/updateproduct/'+state.products[i].ProductId,{

                                        ProductStatus: 'In-Stock'})
                 console.log(product)
            } catch (error) {
               console.log(error)
            }
         }

      }
   },

   async updateQuant(products){
      
      let cartItems = products.getters.cartItems
      let nSold = 0

      try {
             for(let i = 0; i < cartItems.length; i++){
                 
                 let availabelItems = cartItems[i].ProductQuant - cartItems[i].itemsInCart 
                 nSold = cartItems[i].itemsInCart + cartItems[i].ProductSold 
                
                 let product = await axios.put('http://localhost:8000/products/updatequantity',
                                      {ProductQuant: availabelItems,ProductSold: nSold}, 
                                      {params: {ProductId: cartItems[i].ProductId}})                       
                  console.log(product)    
               }
            
      } catch (error) {
         console.log(error)
      }
   },

}

const getters = {
product: state => state.product,
products: state => state.products
}

export default {
   state,
   mutations,
   actions,
   getters
}