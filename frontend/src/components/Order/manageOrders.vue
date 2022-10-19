<template>
    <div>
         
      <h1 class="cyan--text">Manage Orders</h1>

      <div>
         <v-data-table
           :headers="headers"
           :items="Orders"

         >
          <template v-slot:[`item.action`]="{ item }">
              <v-btn icon @click="viewOrder(item)">
                  <v-icon color="cyan">mdi-eye-arrow-right-outline</v-icon>
              </v-btn>
              <v-btn icon @click="editOrder(item)">
                 <v-icon color="teal">mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon @click="viewShippingAddress(item)">
                 <v-icon color="blue">mdi-truck-delivery</v-icon>
              </v-btn>
          </template>

         </v-data-table>
      </div>

      <v-dialog 
          v-model="orderDialog"
          transition="dialog-top-transition"
          max-width="500px"
      >

        <editOrder :closeOrderDialog="closeEditDialog" :Id="orderId"/>

      </v-dialog>

      <v-dialog
        v-model="orderDetailsDialog"
        transition="dialog-top-transition"
        max-width="500px"
      >
       <orderDetails :date="date" :deliveryDate="deliveryDate"
                     :deliveryFee="deliveryFee" :nItems="nItems"
                     :total="total" />
      </v-dialog>

      <v-dialog
         v-model="orderShippingAddressDialog"
         transition="dialog-top-transition"
         max-width="500px"
      >
        <orderShippingAddress :city="city" :code="code"
                              :recipientName="recipientName"
                              :building="nearBuilding" :phone="phone"
                              :streetAddress="streetAddress" :suburb="suburb" />
      </v-dialog>
        
    </div>
</template>

<script>

import axios from 'axios'
import editOrder from './editOrder.vue'
import orderDetails from './orderDetails.vue'
import orderShippingAddress from './orderShippingAddress.vue'
import { mapGetters } from 'vuex'

export default {
    name: 'manageOrders',
    components: {
         editOrder,
         orderDetails,
         orderShippingAddress
    },
    data: ()=> ({

        Orders: [],
        months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
        date: '',
        orderDialog: false,
        orderDetailsDialog: false,
        orderShippingAddressDialog: false,
        orderId: '',
        deliveryDate: '',
        nItems: '',
        total: '',
        deliveryFee: '',
        city: '',
        code: '',
        building: '',
        phone: '',
        streetAddress: '',
        suburb: '',
        recipientName: '',
        nearBuilding: '',

    }),

    computed: {
       headers(){
        return [
            {
                text: 'Order Number',
                align: 'start',
                sortable: false,
                value: 'OrderNumber'
            },

            {
                text: 'Recipient Name',
                sortable: false,
                value: 'RecipientName',
            },

            {
                text: 'Phone Number',
                sortable: false,
                value: 'PhoneNumber'
            },

            {
                text: 'Items',
                value: 'TotalItems'
            },

            {
                text: 'Order Total (R)',
                value: 'OrderTotal'
            },

            {
                text: 'Placed On',
                value: 'CreatedOn'
            },

            {
                text: 'Delivered on',
                value: 'DeliveryDate'
            },

            {
                text: 'Status',
                sortable: false,
                value: 'OrderStatus'
            },

            {
                text: 'Actions',
                sortable: false,
                value: 'action'

            }
        ]
       },
          
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
                    this.$store.dispatch('logout')
              }

        }).catch(console.log())
    
  },

    async created(){
      if(this.user != null && (this.user.data.UserType != 'Customer') ){
          let orders = await axios.get('http://localhost:8000/orders/getorders')
          this.Orders = orders.data
          console.log(this.Orders)
      }else{
         this.$router.push('/')
      }
    },


    methods: {

        viewOrder(order){
           
           this.orderDetailsDialog = true 

           this.date = order.CreatedOn
           this.deliveryDate = order.DeliveryDate
           this.total = order.OrderTotal
           this.nItems = order.TotalItems
           this.deliveryFee = order.DeliveryFee

        },

        viewShippingAddress(order){
           
            this.orderShippingAddressDialog = true 

            this.recipientName = order.RecipientName
            this.streetAddress = order.StreetAddress
            this.nearBuilding = order.NearBuilding
            this.city = order.City
            this.suburb = order.Suburb
            this.code = order.PostalCode
            this.phone = order.PhoneNumber

        },

        editOrder(item){
            
            this.orderDialog = true 
            this.orderId = item.OrderId 
        
        },

        closeEditDialog(){
    
                this.orderDialog = false 

        }
    }
}
</script>

<style scoped>

</style>