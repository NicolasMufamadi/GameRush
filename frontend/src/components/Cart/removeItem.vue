<template>
   <v-card>
        <h2 class="text-center">Confirm Action</h2>
        <v-card-text class="text-center">
            Are you sure you want to remove this Item?
        </v-card-text>

        <div class="d-flex justify-space-between">
            <v-btn class="ml-2 mb-1 cyan" @click="cancelDialog">Cancel</v-btn>
            <v-btn class="mr-2 mb-1 red" @click="deleteItem">Delete</v-btn>
        </div>
   </v-card>    
</template>

<script>

import axios from 'axios'
//import { mapGetters  } from 'vuex'

export default {
    name: 'removeItem',
    props:['productId','cancel','userId'],

    methods:{
      cancelDialog(){
          this.cancel()
      },
        
       deleteItem(){
           console.log(this.productId)
            axios.delete('http://localhost:8000/cart/',{
                params: {UserId: this.userId, ProductId: this.productId}
            }).then(response=>{
                if(response){
                   
                    this.$router.go('')
                }
            }).catch(err=>console.log(err))
      }
    }
}
</script>

<style>

</style>