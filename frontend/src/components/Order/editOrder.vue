<template>
    <v-card max-width="500">
        <h1  class="teal--text text-center"> Change Order Status </h1>
        <v-card-text>
              <v-radio-group v-model="Status">
                   <v-radio
                       label="Awaiting Delivery"
                       color="teal"
                       value="Awaiting Delivery"
                    
                   >

                   </v-radio>

                   <v-radio
                      label="Schedule Delivery"
                      color="teal"
                      value="Schedule Delivery"
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

 
            <div class="d-flex justify-space-between ">
                <v-btn class="mb-2 ml-2 cyan" @click="submitChanges">submit</v-btn>
                <v-btn class="mb-2 mr-2 red" @click="closeDialog">cancel</v-btn>
            </div>
   
    </v-card>    
</template>

<script>

import axios from 'axios'

export default {
    name: 'editOrder',
    props: ['closeOrderDialog','Id'],
    data: ()=> ({
        
        Status: null

    }),

    created(){
        
        console.log(this.Status)

    },


    methods: {
         closeDialog(){
             
              this.closeOrderDialog()

         },

        async submitChanges(){
            
              let order = await axios.put('http://localhost:8000/orders/'+this.Id,{
                   OrderStatus: this.Status
              })
             
             if(order){  
                this.closeOrderDialog()
                this.$router.go('')
             }
            
      

         }


    }
}
</script>

<style>
</style>