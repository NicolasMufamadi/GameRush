<template>
    <div>
         <div class="mt-5 d-flex justify-space-around">
                
             <v-card 
                 class="d-flex justify-start"
                 color='#1F2833' 
                 width='750' 
                 height='300'>
                 
                 <v-img 
                      class="ml-3"
                      contain 
                      height='250'
                      max-width='250'
                      :src=product.ProductImg>

                 </v-img>
               
               <div class="cyan--text mt-16 ml-8">
                   <h1>{{product.ProductName}}</h1>
                   <v-divider class="white"></v-divider>
                   <div class="mt-2">
                        <h4 class="grey--text">Category:<span class="cyan--text"> {{product.ProductCategory}} </span></h4>
                        <h4 class="grey--text">SubCategory:<span class="cyan--text"> {{product.ProductSubCategory}} </span></h4>
                        <h4 class="cyan--text">{{product.ProductStatus}}</h4>
                   </div>
   
                   </div>
                                                  
             </v-card>

             <v-card
                  class="mt-5"   
                  color='#1F2833' 
                  width='250' 
                  height='250'>
                  
                   <div class="cyan--text text-center mt-1">
                      <h1>R {{product.ProductPrice}}</h1>
                      <h4>Quantity:{{product.ProductQuant}}</h4>
                   </div>
                 

                  <v-card-actions>
                           <v-btn 
                           color='cyan'
                           outlined
                           class="ml-10 mt-2"
                           @click="addToCart"
                           >
                           <v-icon small>mdi-plus</v-icon>
                           <v-icon small>mdi-cart</v-icon>
                               Add to Cart
                           </v-btn>
                  </v-card-actions>

                  <p v-if="product.ProductRatings > 0" class="white--text text-center mt-1">Rating: {{product.ProductRatings}} 
                     <v-icon  class="cyan--text ml-2">mdi-account</v-icon>
                     {{product.ProductReviewers}} reviewers
                  </p>
                  
                    <v-rating
                       v-if="product.ProductRatings > 0"
                       v-model="product.ProductRatings"
                       color="yellow"
                       background-color="white"
                       empty-icon="$ratingFull"
                       half-increments
                       class="text-center"
                       small
                     
                    >

                    </v-rating>
                
                   <h4 v-else class="mt-3 cyan--text text-center">No reviews, buy and be the first</h4>
              
             </v-card>

         </div>
      <div class="mt-10">

          <productDescription/>

      </div>

      <div>
           <productReviews />
      </div>

      <v-dialog v-model="login"
                max-width="500px"
                transition="dialog-transition">
         <Login :done='doneLogin'/>
      </v-dialog>

    </div>
</template>

<script>

import { mapGetters } from 'vuex'
import productDescription from './productDescription.vue'
import Login from '../Authentication/login.vue'
import productReviews from './productReviews.vue'
import axios from 'axios'

export default {

      name: 'viewProduct',
      components: {
            productDescription,
            productReviews,
            Login,
      },
      data: ()=>({
           
           CartId: '',
           ProductId: '',
           Product: [],
           CartProducts: [],
           Quantity: 1,
           CartTotal: '',
           login: false,
           authorization: '',
          
 
           
      }),

      computed: {
          ...mapGetters(['user','product','Cart','nItems'])
      },

      created(){
         if(this.user !== null){
              this.$store.dispatch('getCart',{UserId: this.user.data.UserId, ProductId: this.product.ProductId})
              this.$store.dispatch('authenticateUser')
              console.log(this.product)
         }

  
      },

      beforeMount(){

                   axios.post('http://localhost:8000/users/checkauth',this.user,{
                      headers:{
                                'content-type': 'text/json',
                                'Authorization': 'Bearer'+ ' '+ localStorage.getItem('token')
                             }
           }).then(response=>{
                this.authorization = response.data.Authorization
                console.log(this.authorization)
          }).catch((console.log('Token expired')))

     },

      methods: {

       async  addToCart(){

       console.log(this.authorization)
       if(this.user !== null && this.authorization == 'LoggedIn'){
          
          let checkProduct = this.Cart.find(({ProductId})=> ProductId == this.product.ProductId)
          
          if(checkProduct === undefined){

               try{
                   let product = await axios.post('http://localhost:8000/cart',{
                             UserId: this.user.data.UserId,
                             ProductId: this.product.ProductId
                          })
                if(product){
                    this.$store.dispatch('increment')
                    this.$router.go('')
                }

              }catch(error){
                  console.log(error)
            }
         
         }else{
            this.$router.push('/cart')
         }

      }else{
          this.$store.dispatch('logout')
          this.login = true 
      }
    },

    doneLogin(){
           this.login = false
           this.$router.go('')
    }

              
      }
                          

}
</script>

<style scoped>

</style>