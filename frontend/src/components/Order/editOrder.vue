<template>
    <v-card max-width="500">
        <h1  class="teal--text text-center"> Change Order Status </h1>
        <v-card-text>
              <v-radio-group v-model="status">
                   <v-radio
                       label="Awaiting Delivery"
                       color="teal"
                       value="Awaiting Delivery"
                    
                   >

                   </v-radio>

                   <v-radio
                      label="Schedule Delivery"
                      color="teal"
                      value="Scheduled Delivery"
                      @click="calendarDialog = !calendarDialog"
                   >

                   </v-radio>
                   
                   <v-radio
                     label="Delivered"
                     color="teal"
                     value="Delivered"
                   >
                      
                   </v-radio>

              </v-radio-group>
        </v-card-text>  
            
            <p v-if="valid == false" class="text-center red--text">{{prompt}}</p>
 
            <div class="d-flex justify-space-between ">
                <v-btn class="mb-2 ml-2 cyan" @click="submitChanges">submit</v-btn>
                <v-btn class="mb-2 mr-2 red" @click="closeDialog">cancel</v-btn>
            </div>

            <v-dialog
              v-model="calendarDialog"
              transition="dialog-top-transition"
              max-width="500px"
            >
              <scheduleOrder :closeCalendar="closeCalendar" :Id="Id" :status="status"/>
            </v-dialog>
   
    </v-card>    
  

</template>

<script>

import axios from 'axios'
import scheduleOrder from './scheduleOrder.vue'

export default {
    
    name: 'editOrder',
    
    props: ['closeOrderDialog','Id'],
    
    components: {
        scheduleOrder
    },
    
    data: ()=> ({
        
        status: null,
        focus: '',
        calendarDialog: false,
        months: ['January','February','March','April','May','June','July','August','September','October','November','December'], 
        order: null,
        valid: true,
        prompt: '' 

    }),


    async created(){
        this.order = await axios.get('http://localhost:8000/orders/getorder/',{params: {OrderId: this.Id}})
        console.log(this.order)
    },

    methods: {
        closeDialog(){
              this.closeOrderDialog()
              this.$router.go()
         },

        closeCalendar(){
            this.calendarDialog = false  
         },

        async submitChanges(){
            
            let date = new Date()
            let deliveryDate = date.getDate() +'-'+ this.months[date.getMonth()] +'-'+ date.getFullYear() 
            
            if(!this.validate()) return false 
            
            let order = await axios.put('http://localhost:8000/orders/'+this.Id,{
                   OrderStatus: this.status,
                   DeliveryDate: deliveryDate
              })
             
             if(order){  
                this.Status = ' '
                this.closeOrderDialog()
                this.$router.go('')
             }
            
         },

        validate(){
           
           if(this.status == null){
                this.valid = false
                this.prompt = 'Please select the change you want to make' 
            }else{
                this.prompt = ''
                this.valid = true 
            }
           
           if( this.status != null && this.order.data.OrderStatus == 'Delivered'){
                this.valid = false 
                this.prompt = 'This Order has been delivered already'
            }
            
            return this.valid
        }


    }
}
</script>

<style>
</style>