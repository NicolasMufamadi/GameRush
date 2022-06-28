<template>
    <div>
        <h1 class="cyan--text">View Orders</h1>
        <v-btn color="cyan"><v-icon>mdi-sort</v-icon>Sort Orders</v-btn>
      
       <v-card 
         class=" mt-5" 
         v-for="(order) in Orders" :key="order.OrderId"
         @click="viewOrder(order)"  
       >
       <v-card-title>Order: {{order.OrderNumber}} - {{order.OrderStatus}}</v-card-title>
        
        <v-card-text>
           <h3>Items: {{order.TotalItems}}</h3>
           <h3>Date Placed: {{date}}</h3>
           <h3>Delivery Date: {{order.DeliveryDate}}</h3>
           <h3>Total Amount: R {{order.OrderTotal}}</h3>
        </v-card-text>

       </v-card>
      
   <template>
     <v-row justify="center">
        <v-dialog
           v-model="dialog"
           fullscreen
           hide-overlay
           transition="dialog-top-transition"
        >  

          <v-card >
              <v-toolbar
                dark
                color="#1F2833"
              >
                <v-toolbar-title class="cyan--text">View Order</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn
                      icon
                      color="cyan"
                      @click="dialog = false"
                    > 
                     <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar-items>
              </v-toolbar>
               
                <v-card-title><h1 class="ml-3 cyan--text">Order: {{orderNumber}} - {{orderStatus}}</h1></v-card-title>

                <v-card-text>
                  <div class="d-flex justify-space-between">     
                  <div class="mt-5 ml-3">
                     <h1 class="teal--text mb-2">Order Details</h1>
                     <h3>Items: {{nItems}}</h3>
                     <h3 v-if="deliveryFee == 'Free'">Delivery Fee: Free Delivery</h3>
                     <h3 v-else>Delivery Fee: R {{deliveryFee}}</h3>
                     <h3>Total Amount: R {{total}}</h3>
                     <h3>Placed: {{date}}</h3>
                     <h3>Delivery: {{deliveryDate}}</h3>
                   </div>
                 <div class="mt-5 ml-3">
                       <h1 class="teal--text">Shipping Address</h1>
                       <h3>Recipient Name: {{recipientName}}</h3>
                       <h3>Phone Number: {{phone}}</h3>
                       <h3>Street Address: {{streetAddress}}</h3>
                       <h3 v-if="building">Near Building:  {{}}</h3>
                       <h3>City:  {{city}}</h3>
                       <h3>Suburb: {{suburb}}, {{code}}</h3>
                  </div>
                  </div>
                   <h1 class="cyan--text mt-3 ml-3">Order Products</h1>
                      <v-list>
                         <v-list-item-group v-model="model">
                             <v-list-item v-for="product in Products" :key="product.ProductId" >
                             <v-list-item-content>
                             <div class="products">
                              
                                 <v-img
                                     class="my-2 ml-2"
                                     :src="product.ProductImg"
                                      contain
                                      max-width="150px"
                                 >
                                 </v-img>
                                  <div class="ml-2">
                                     <h4 class="teal--text">Product Price: R{{product.ProductPrice}}</h4>
                                     <h4 class="teal--text">Product Name: {{product.ProductName}}</h4> 
                                     <h4 class="teal--text">Product Quantity: {{product.itemsInCart}}</h4>
                                  </div>
                                </div>

                                </v-list-item-content>
                             </v-list-item>
                         </v-list-item-group>
                     </v-list>
                </v-card-text>
               
          </v-card>
        </v-dialog>
     </v-row>
  </template>
    </div>
</template>

<script>

import axios from 'axios'
import { mapGetters } from 'vuex'
//import viewOrder from './viewOrder.vue'

export default {
 
  name: 'ViewOrders',
  components: {
    //  viewOrder
  },
  data: ()=>({

      product: '',
      Products: [],
      Orders: [],
      months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
      date: '',
      dialog: false,
      orderStatus: '',
      orderNumber: '',
      recipientName: '',
      streetAddress: '',
      building: '',
      city: '',
      suburb: '',
      code: '',
      total: '',
      nItems: '',
      deliveryDate: '',
      deliveryFee: '',
      phone: '',
      model: 1

  }),

  computed: {
       ...mapGetters(['user'])  
  },

   beforeMount(){

        axios.post('http://localhost:8000/users/checkauth',this.user,{
          headers:{
            'content-type': 'text/json',
            'Authorization': 'Bearer'+ ' '+ localStorage.getItem('token')
          }
        }).then((response)=>{
              
              if(response.data.Authorization !== 'LoggedIn'){
                   
                    this.$router.push('/')
                    this.$store.dispatch('logout')
              
              }

        }).catch(()=>console.log())
    
  },

  created(){
     
     if(this.user !== null){
        
        axios.get('http://localhost:8000/orders/',{params: {UserId: this.user.data.UserId}})
        .then(response=>{
         
              this.Orders = response.data     
              console.log(this.Orders)
              for(let i = 0; i < this.Orders.length; i++){
                 let orderDate = this.Orders[i].createdAt 
                  let newDate = new Date(orderDate)
                  this.date = newDate.getDate() +'-'+ this.months[newDate.getMonth()] +'-'+ newDate.getFullYear()
              }

      }).catch(()=>console.log())

   }
 },


 methods: {
      viewOrder(order){
        console.log(order)
         this.dialog = true 

         this.orderNumber = order.OrderNumber
         this.Products = JSON.parse(order.Products)
         this.recipientName = order.RecipientName
         this.streetAddress = order.StreetAddress
         this.city = order.City
         this.suburb = order.Suburb
         this.code = order.PostalCode
         this.total = order.OrderTotal
         this.nItems = order.TotalItems
         this.deliveryDate = order.DeliveryDate
         this.deliveryFee = order.DeliveryFee
         this.orderStatus = order.OrderStatus
         this.phone = order.PhoneNumber
        
      }
 }


}



</script>

<style scoped>
.products{
   border: 1px solid grey;
   
}
</style>