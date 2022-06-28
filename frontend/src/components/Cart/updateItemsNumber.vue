<template>
   <v-card>
        <h2 class="text-center">Confirm Action</h2>
        <v-card-text class="text-center">
            Select number of Items
        </v-card-text>

        <v-row>
            <v-col cols="12">
               <v-select
                  dense
                  :items="items"
                  cyan
                  :error="validInput ? true : false"
                  :error-messages="validInput"
                  v-model="quantity"
                  class="mb-2"
               >

               </v-select> 
            </v-col>
        </v-row>

        <div class="d-flex justify-space-between">
            <v-btn class="ml-2 mb-1 cyan" @click="cancelDialog">Cancel</v-btn>
            <v-btn class="mr-2 mb-1 teal" @click="updateItem">Update</v-btn>
        </div>
   </v-card>    
</template>

<script>

import axios from 'axios'

export default {
    name: 'removeItem',
    props:['productId','cancel','userId','total'],

    data:()=>({
             
             items: [1,2,3,4,5,6,7,8,9,10],
             validInput: null,
             quantity: null
    }),

    methods:{
      cancelDialog(){
          this.cancel()
      },
        
       updateItem(){
           if(this.quantity != null){

               axios.put('http://localhost:8000/cart',
                  {ProductQuantity: this.quantity},
                  {params: {UserId: this.userId, ProductId: this.productId}}
            
            ).then(response=>{
                if(response){
                    this.cancel()
                    this.$router.go('')
                }
            }).catch(err=>console.log(err))
          }else{
              this.validInput = 'please select quantity you want to update to'
          }
      }
    }
}
</script>

<style>

</style>