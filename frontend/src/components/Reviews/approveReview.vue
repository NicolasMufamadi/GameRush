<template>
   <v-card>
      
      <h1 class="text-center teal--text">Confirm action</h1>
      
      <v-card-text>
         <p class="text-center mt-2">Are you sure you want to approve this review?</p>
      </v-card-text> 

      <div class="d-flex justify-space-between">
          <v-btn class="ml-2 mb-2 cyan" @click="confirm">approve</v-btn>
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
        status: 'Approved',
        ratingsTotal: 0, 
        ratingSum: 0,
        reviews: [],
        ratings: 0 
    
    }),

    methods: {


        async confirm(){
            this.update = await axios.put('http://localhost:8000/reviews/',{Status: this.status},{params: {ReviewId: this.review.ReviewId}})
             console.log(this.update)  
            this.calculateProductRatings()
           
        },

        async calculateProductRatings(){
            //get nreviews 
            let response =  await axios.get('http://localhost:8000/reviews/productreviews',{params: {ProductId: this.review.ProductId}})
            this.reviews = response.data

            for(let i = 0; i < this.reviews.length; i++){
                
               this.ratingSum += this.reviews[i].Rating 
               console.log(this.ratingSum)
               this.ratingsTotal = (this.ratingSum) / (this.reviews.length) 
               this.ratings = this.ratingsTotal.toFixed(1)
               console.log(this.ratings)
            }

           this.product = await axios.put('http://localhost:8000/products/updateproduct/'+this.review.ProductId, {ProductRatings: this.ratingsTotal})
           
           if(this.product){
               this.$router.go('/')
           }

        },
        
        cancel(){
           this.close()
        }
    }
}
</script>

<style>
</style>