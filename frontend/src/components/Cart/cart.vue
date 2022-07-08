<template>
    
<div>

     <h2 class="cyan--text">Shopping Cart</h2>

    <v-card 
        v-if="user== null || Cart.length == 0"
        class="mt-10 pt-10"  
        color="#F5F5F5"
          
    >
        <v-card-text>
            <div class="d-flex justify-center">
         
             <div>
             

                   <v-btn 
                   class="mb-2 ml-10"
                   x-large
                   outlined
                   fab
                   color="cyan"
               >
                <v-icon>mdi-cart-variant</v-icon>   
                 <span class="items">0</span>
                    
               </v-btn>
    
               
               <p>{{message}}</p>
             
             </div>
       
            </div>

            <div class="mb-2 d-flex justify-center">
              <v-btn class="ml-15 cyan white--text" to="/">Continue Shopping</v-btn>
            </div>
        

        </v-card-text>

    </v-card>



<v-card
   v-else
   v-for="(product,p) in cartItems"
   :key="p"
   class="mb-8 mt-5"

 >

    <div>

     <v-img
      :src=product.ProductImg
      contain
      width="250px"
      class="ml-2"
     >

     </v-img>
    
     <h3 class="productname">{{product.ProductName}}</h3>
     <li><span>{{product.ProductStatus}}</span></li> 
      
         
       <v-row class="sidebar">
           <span>Quantity: {{product.ProductQuant +' Available'}}</span>
           <v-col cols="4" sm="4">
   
              <v-select
               :items="items"
                filled
                dense
                v-model ="product.itemsInCart"
                readonly
                color="cyan"
             >

             </v-select>
           </v-col>
           <h3>R {{product.ProductPrice * product.itemsInCart }}</h3>
        </v-row>
       
        <div class="d-flex justify-end">
            <v-btn color="teal" small icon @click="updateItem(product.ProductId)"><v-icon>mdi-pencil</v-icon></v-btn>
            <v-btn color="red" small icon><v-icon>mdi-heart</v-icon></v-btn>
            <v-btn color="cyan" small icon @click="deleteItem(product.ProductId)"><v-icon >mdi-delete</v-icon> </v-btn>
        </div>
 
     </div>
 
    </v-card>

   
   <div v-if="user !==null && Cart.length > 0" class="d-flex justify-center">
        <v-card width="400px" color="cyan">

            <h3 class="ml-5 white--text text-center mb-2 mt-2">Total: R {{cartTotal}}</h3>
       
       <div class="d-flex justify-center mb-5">
          <v-btn color="#1F2833" class="checkout white--text" @click="checkoutCart">Checkout</v-btn>
       </div>
          
     </v-card>
    </div>
  <h4 v-if="!checkout" class="text-center red--text mt-2">Please checkout only available number of items</h4>
 <v-dialog
    transition="dialog-bottom-transition"
    max-width="500"
    v-model="deleteItemDialog"
 >
 <removeItem :productId='productId' :userId="userId" :cancel='cancel'/>
 </v-dialog>

  <v-dialog
    transition="dialog-bottom-transition"
    max-width="500"
    v-model="updateItemDialog"
 >
 <updateItem :productId='productId' :userId="userId" :cancel='cancel'/>
 </v-dialog>

<v-dialog 
          v-model = "loginDialog"
          max-width = "500px"
          transition = "dialog-bottom-transition" 
>
 <login :done="doneLogin"/> 
</v-dialog>

</div>

</template>

<script>

import { mapGetters } from 'vuex'
import removeItem from './removeItem.vue'
import updateItem from './updateItemsNumber.vue'
import login from '../Authentication/login.vue'
import axios from 'axios'

export default {
   name: 'Cart',
   components:{

     removeItem,
     updateItem,
     login
   
   },
   data: ()=>({
       
     items: [1,2,3,4,5,6,7,8,9,10],
     quantity: [],
     productItems: [],
     changeQuantity: '',
     deleteItemDialog: false,
     productId: '',
     userId: '',
     updateItemDialog: false,
     checkout: true,
     message: '',
     loginDialog: false,


   }),
   computed: {
       ...mapGetters(['user','product','Cart','cartItems','Products','cartTotal','checkoutStatus','auth']),
   },


  created(){
   
   if(this.user !== null){
     //this.$store.dispatch('authenticateUser') 
    // console.log(this.auth)
     this.$store.dispatch('getCart',{UserId: this.user.data.UserId, ProductId: this.product.ProductId})
     this.$store.dispatch('addProduct',{UserId: this.user.data.UserId, ProductId: this.product.ProductId})
     
   }else{
       this.$store.dispatch('logout')
       console.log(this.user)
    }
 },
  
 beforeMount(){

      axios.post('http://localhost:8000/users/checkauth',this.user,{
            headers:{
                'content-type': 'text/json',
                'Authorization': 'Bearer'+ ' '+ localStorage.getItem('token')
          }
        }).then(response=>{
           if(response.data.Authorization !== 'LoggedIn'){
                  this.loginDialog = true 
                  this.$store.dispatch('logout')
           }
        }).catch((console.log('Token expired')))

  },

   methods:{

       getCartProducts(cart){
         console.log(cart)
            for(var i =0; i < cart.length; i++){
               this.quantity.push(cart[i].ProductQuantity)
               axios.get('http://localhost:8000/products/getproduct/'+cart[i].ProductId)
               .then(response=>{
                  
                  this.CartProducts.push(response.data)
                  this.$store.dispatch('getProducts',this.CartProducts)

                  this.cartTotal += this.Products[i].ProductPrice * cart[i].ProductQuantity

               }).catch(console.log)
            }
       },


        updateItem(productId){
            this.updateItemDialog = true 
            this.productId = productId
            this.userId = this.user.data.UserId
        },

         deleteItem(productId){

            this.deleteItemDialog = true 
            this.productId = productId
            this.userId = this.user.data.UserId
          
       },

       cancel(){
           this.deleteItemDialog = false 
           this.updateItemDialog = false 
       },

       checkoutCart(){
           this.$store.dispatch('checkout')
           
           if(this.checkoutStatus == false){
             this.checkout = false 
             console.log(this.checkout)
           }else{
             this.$router.push('/checkout')
           }
       },


       doneLogin(){
          this.loginDialog = false
       }


 }

} 
</script>

<style >
.items{
    position: absolute;
    bottom:25px;
}


.productname{
  position: absolute;
  bottom: 50%;
  left: 350px;
  color: teal;
}

li{
    position: absolute;
    bottom: 38%;
    left: 375px;
    color: rgb(28, 73, 73);
}

.sidebar{
    position:absolute;
    left: 70%;
    bottom: 40%;
}

.checkout{
    color: #1F2833;
    display: block;
    width: 90%;

    
}

</style>