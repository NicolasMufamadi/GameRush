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
              <v-btn icon>
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
        
    </div>
</template>

<script>

import axios from 'axios'
import editOrder from './editOrder.vue'
import { mapGetters } from 'vuex'

export default {
    name: 'manageOrders',
    components: {
         editOrder
    },
    data: ()=> ({
        Orders: [],
        months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
        date: '',
        orderDialog: false,
        orderId: '' 
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

   async created(){
      if(this.user !== null){
          let orders = await axios.get('http://localhost:8000/orders/getorders')
          this.Orders = orders.data
      }else{
         
         this.$router.push('/')
           
      }
    },


    methods: {
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