<template>
   <v-card>
      
      <h1 class="text-center teal--text">Confirm action</h1>
      
      <v-card-text>
         <p class="text-center mt-2">Are you sure you want to disapprove this review?</p>
      </v-card-text> 

      <div class="d-flex justify-space-between">
          <v-btn class="ml-2 mb-2 cyan" @click="confirm">disapprove</v-btn>
          <v-btn class="mr-2 mb-2 red" @click="cancel">cancel</v-btn>  
      </div>
   
   </v-card>    

</template>

<script>

import axios from 'axios'

export default {
    
    name: 'approveReview',

    props: ['close','review'],

    data: ()=> ({
        
        product: '',
        update: '',
        status: 'Disapproved',

    }),

    methods: {


        async confirm(){
            this.update = await axios.put('http://localhost:8000/reviews/',{Status: this.status},{params: {ReviewId: this.review.ReviewId}})
            this.$router.go('/')
        },

        
        cancel(){
           this.close()
        }
    }
}
</script>

<style>
</style>