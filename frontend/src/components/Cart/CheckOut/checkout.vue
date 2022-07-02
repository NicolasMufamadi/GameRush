<template>
    <div>
        <h1 class="cyan--text">Checkout</h1>
      <div>

      
        <v-stepper color="cyan" vertical v-model="checkoutStepper">

          <v-stepper-header >
              
              <v-stepper-step :complete="checkoutStepper > 1" step="1">
                  Delivery
              </v-stepper-step>

              <v-divider></v-divider>
                
             <v-stepper-step :complete="checkoutStepper > 2" step="2">
                  Cuopon
             </v-stepper-step>   
         
              <v-divider></v-divider>

              <v-stepper-step step="3">
                  Payment
              </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
               <v-stepper-content step="1">
                   <v-card>
                       <div class="mt-2 cyan--text d-flex justify-space-between">
                          <h2>Choose Delivery Address</h2>
                          <p class="black--text">Delivery Fee: R50....    Spend R 500.00 or more to get free delivery </p>
                          <v-btn class="mt-2 cyan" to="myaccount/address-book/add">Add Address</v-btn>
                       </div>
                      
                             <v-list three line  >
                 <v-list-item-group  dense  dark >
                      
                   <v-list-item class="item" v-for="address in addresses" :key="address.AdressId" @click="selectAddress(address)"> 
                      <template  v-slot:default = "{ active }">
                       <v-list-item-icon class="my-auto">
                         <v-btn icon @click="selectedAddress(address.AdressId)"><v-icon >mdi-circle-outline</v-icon></v-btn>
                       </v-list-item-icon>
                    
                       <v-list-item-content>

                         <div>
                             <div class="d-inline ml-15 ">
                               <v-chip v-if="active" small class="ml-5" color='teal'>{{address.AdressType}}</v-chip>
                               <v-chip v-else small class="ml-5" color='white' light>{{address.AdressType}}</v-chip>
                             </div>
                            <div class="d-inline ">
                             <v-list-item-title class="font-weight-black" v-text="address.RecipientName"></v-list-item-title> 
                            </div>
                         </div>

                          <v-list-item-subtitle v-if="address.GeographicalFeature && !active" v-text="address.GeographicalFeature"></v-list-item-subtitle>
                          <v-list-item-subtitle v-else class="black--text"  v-text="address.GeographicalFeature"></v-list-item-subtitle>

                          <v-list-item-subtitle v-if="!active" v-text="address.City"></v-list-item-subtitle>
                          <v-list-item-subtitle v-else class="black--text" v-text="address.City"></v-list-item-subtitle>

                          <v-list-item-subtitle v-if="!active" >{{address.StreetAdress}}, {{address.Suburb}}, {{address.PostalCode}} </v-list-item-subtitle>
                          <v-list-item-subtitle v-else class="black--text">{{address.StreetAdress}}, {{address.Suburb}}, {{address.PostalCode}}</v-list-item-subtitle>  

                          <span class="mt-2">{{address.RecipientMobile}}</span>
                    
                       </v-list-item-content>

                      </template>
                   </v-list-item>
                 </v-list-item-group>
               </v-list>
               
               
               <div class="d-flex justify-space-between">
                   <v-btn class="ml-2 teal white--text" to="/cart">Re-Check--<v-icon>mdi-cart</v-icon></v-btn>
                   <v-btn class="cyan white--text" v-if="addresses.length > 0 && selectedItem == true" @click="checkoutStepper = 2">Next</v-btn>
               </div>

               <h5 v-if="addressErr" class="mt-5 red--text text-center">{{errMessage}}</h5>

         </v-card> 
      </v-stepper-content>
      
      <v-stepper-content step="2">
          <v-card>
              <h2 class="cyan--text">Add Cuopon</h2>
             <div class="d-flex justify-space-between">
                <v-btn class="ml-2 teal white--text" @click="checkoutStepper=1">Back</v-btn>
                <v-btn class="mr-2 cyan white--text" @click="checkoutStepper=3">Next</v-btn>
              </div>
          </v-card>
      </v-stepper-content>

      <v-stepper-content step="3">
          <v-card>
              <h2 class="cyan--text">Payment</h2>
                 
                  <div class="d-flex justify-center mt-5 mb-5">
                      <v-card width="350px" color="#1F2833">
                           <v-card-text class="white--text">
                               <h3>Order Total: R {{cartTotal}} </h3>
                               <h3>Delivery Fee:  {{deliveryFee}} </h3>
                               <h3>Cuopon: None</h3>
                               <h3>Expected Delivery Date: {{deliveryDate}} </h3>
                           </v-card-text>
                      </v-card>


                  </div>

                 <div class="d-flex justify-center">
                      <v-btn large class="paybtn cyan white--text" @click="checkOut">Pay R {{totalAmount}}</v-btn>
                 </div>
            
                  <v-btn class="ml-2 teal white--text" @click="checkoutStepper = 2 ">Back</v-btn>
                  
          </v-card>
      </v-stepper-content>

    </v-stepper-items>

   </v-stepper>

   <v-dialog 
         v-model = "loginDialog"
         transition = "dialog-bottom-transition"
         max-width = "500px"
   >
      <login :done='doneLogin'/>
   </v-dialog>
  
  </div>
</div>
</template>

<script>

import { mapGetters } from 'vuex'
import axios from 'axios'
import login from '../../Authentication/login.vue'

export default {

  name: 'Checkout',
  
  components: {
     login
  },

  data: ()=>({
      checkoutStepper: 1,
      addresses: [],
      addressId: '',
      streetAddress: '',
      suburb: '',
      postalCode: '',
      recipientName: '',
      city: '',
      cartProducts: [],
      deliveryDate: '',
      selectedItem: false,
      deliveryFee: '',
      totalAmount: 0,
      months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
      loginDialog: false,
      addressErr: false,
      errMessage: '',
      phoneNumber: '',

      
  }),
 
  computed: {
      ...mapGetters(['user','Address','cartTotal','cartItems','product','nItems']),
  },

 created(){
 
   if(this.user !== null){
   
     this.$store.dispatch('addProduct',{UserId: this.user.data.UserId, ProductId: this.product.ProductId})
     console.log('Items:'+this.nItems)
     axios.get('http://localhost:8000/address/getaddresses',{params: {UserId: this.user.data.UserId}})
      .then(response=>{
            this.addresses = response.data
            let date = new Date()
            let result = date.setDate(date.getDate() + 4)
            let day = new Date(result)
            this.deliveryDate = day.getDate() +'-'+ this.months[day.getMonth()] +'-'+ day.getFullYear()
         console.log(this.deliveryDate)
        if(this.cartTotal >= 500){
            this.deliveryFee = 'Free'
            this.totalAmount = this.cartTotal
        }else{
            this.deliveryFee = 50
            this.totalAmount = this.deliveryFee + this.cartTotal
        }

     }).catch(err=>console.log(err))
   
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
                  this.$router.push('/')
           }
        }).catch((console.log('Token expired')))

  },

 methods: {
     
    selectAddress(address){
       
       this.selectedItem = true 

       this.AddressId = address.AdressId
       this.recipientName = address.RecipientName
       this.phoneNumber = address.RecipientMobile
       this.suburb = address.Suburb 
       this.streetAddress = address.StreetAdress
       this.city = address.City 
       this.postalCode = address.PostalCode 
      
   }, 
   
  checkOut(){
       
       axios.post('http://localhost:8000/orders/',{
         UserId: this.user.data.UserId,
         Products: this.cartItems,
         RecipientName: this.recipientName,
         PhoneNumber: this.phoneNumber,
         StreetAddress: this.streetAddress,
         PostalCode: this.postalCode,
         City: this.city,
         Suburb: this.suburb,
         TotalItems: this.nItems,
         OrderTotal: this.totalAmount,
         DeliveryDate: this.deliveryDate,
         DeliveryFee: this.deliveryFee

       }).then(response=>{
          console.log(response)
          this.$store.dispatch('removeCart',response.data.UserId)
          this.$store.dispatch('updateQuant',this.cartItems)
          this.$router.push('/ordersuccessful')
          this.addressErr = false 

       }).catch(()=>{
            this.addressErr = true  
            this.errMessage = 'Please Select the Address'
            this.checkoutStepper = 1   
       })

  },


  doneLogin(){
    this.loginDialog = false
  }

 }


}
</script>

<style>
.paybtn{
    display: block;
    width: 50%;

 }
</style>