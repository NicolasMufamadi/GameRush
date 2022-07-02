<template>
    <div>
        <h1 class="cyan--text">View Orders</h1>
        
        <div class="d-flex justify-space-between">
          <v-btn v-if="Orders.length > 0" color="cyan"><v-icon>mdi-sort</v-icon>Sort Orders</v-btn>
        </div>
      
       <v-card 
        
         class=" mt-5" 
         v-for="(order) in Orders" :key="order.OrderId"
         @click="viewOrder(order)"  
       >
       <v-card-title>Order: {{order.OrderNumber}} - {{order.OrderStatus}}</v-card-title>
        
        <div class="d-flex justif-space-between">

           <v-card-text>
             <h3>Items: {{order.TotalItems}}</h3>
             <h3>Date Placed: {{order.CreatedOn}}</h3>
             <h3>Delivery Date: {{order.DeliveryDate}}</h3>
             <h3>Total Amount: R {{order.OrderTotal}}</h3>
          </v-card-text>
 
           <v-btn v-if="order.OrderStatus === 'Delivered' " class="cyan mr-4"  @click="review = true"><v-icon color="yellow">mdi-star</v-icon>Reviews</v-btn> 
        
        </div>

       </v-card>

    <div v-if="Orders.length == 0" class="d-flex justify-center">

     <v-card max-width="200px" class="card teal">
        <v-card-text class="black--text">No orders available</v-card-text>
    </v-card>
   
   </div>
      
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
                      @click="closeDialog()"
                    > 
                     <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar-items>
              </v-toolbar>
               
               <h1 class="ml-3 cyan--text text-center">Order: {{orderNumber}} - {{orderStatus}}</h1>

                <v-card-text>
                  <div class="d-flex justify-space-between">     
                  
                  <div class="mt-5 ml-3">
                       <orderDetails :date="date" :deliveryFee="deliveryFee" 
                                     :deliveryDate="deliveryDate" :nItems="nItems"
                                     :total="total"/>   
                   </div>

                  <div class="mt-5 ml-3">
                      <orderShippingAddress :suburb="suburb" :city="city" 
                                             :code="code" 
                                             :phone="phone" 
                                            :streetAddress="streetAddress" :recipientName="recipientName" />
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
                                    
                                    <div class="buttons">
                                       <v-btn v-if="review" class="mr-2" outlined @click="reviewProduct(product)">Write Review</v-btn>
                                       <v-btn  v-if="review" class="ml-2" outlined @click="viewReview(product)">View Review</v-btn>
                                    </div>
                                    
                                    <div>

                                      <h4 class="ml-2 teal--text">Product Price: R{{product.ProductPrice}}</h4>
                                      <h4 class="ml-2 teal--text">Product Name: {{product.ProductName}}</h4> 
                                      <h4 class="ml-2 teal--text">Product Quantity: {{product.itemsInCart}}</h4>

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


    <v-dialog
        v-model="reviewDialog"
        transition="dialog-top-transition"
        persistent 
    >
         <reviewProduct :closeReviewDialog="close" :Id="productId" :pName="productName"/>
    </v-dialog>

    <v-dialog
       v-model="viewReviewDialog"
       transition="dialog-top-transition"
       persistent
    >
      <viewReview :Id= "productId" :closeDialog="close"/>
    </v-dialog>

  </div>
</template>

<script>

import axios from 'axios'
import { mapGetters } from 'vuex'
import orderShippingAddress from './orderShippingAddress.vue'
import orderDetails from './orderDetails.vue'
import reviewProduct from '../Reviews/productReview.vue'
import viewReview from '../Reviews/viewReview.vue'

export default {
 
  name: 'ViewOrders',
  components: {
      orderShippingAddress,
      orderDetails,
      reviewProduct,
      viewReview
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
      model: 1,
      deliveredProducts: [],
      review: false,
      reviewDialog: false,
      viewReviewDialog: false,
      productId: '',
      productName: ''  

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
        
        this.deliveredProducts = []

        axios.get('http://localhost:8000/orders/',{params: {UserId: this.user.data.UserId}})
        .then(response=>{
         
              this.Orders = response.data    
              console.log(this.Orders)

      }).catch(()=>console.log())

   }
 },


 methods: {
      viewOrder(order){
       
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
         this.date = order.CreatedOn
         //this.building = order.
        console.log(this.recipientName)
      },

    reviewProduct(product){
         
         this.reviewDialog = true
         this.productId = product.ProductId
         this.productName = product.ProductName

    },

    viewReview(product){
       
       this.viewReviewDialog = true 
       this.productId = product.ProductId 

    },

    closeDialog(){
        
        this.dialog = false
        if(this.review == true){
            this.review = false 
        }

    },

    close(){
        
        if(this.reviewDialog){
           this.reviewDialog = false
        }else{
          this.viewReviewDialog = false 
        }
   
   }

 }


}



</script>

<style scoped>
.products{
   border: 1px solid grey;
   
}

.buttons{
  position: absolute;
  left: 60rem;
  bottom: 4.5rem;
}


</style>