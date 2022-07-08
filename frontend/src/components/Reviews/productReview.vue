<template>
 
 <v-card >
         
  <h1 class="cyan--text text-center">Review product</h1>
  
    <v-card-text>
       
     <v-text-field
       v-model="name"
       label="Name"
       filled

     >
      <v-icon>mdi-account</v-icon> 

     </v-text-field>

     <v-textarea
         v-model="comment"
         label="Comment"
         filled
         :error="comment_err ? true : false"
         :error-messages="comment_err"
     >
          
     </v-textarea>
   
   <h4>Rating</h4>
   
   <v-rating
         v-model="rating"
         color="yellow"
         large

     >

     </v-rating>
     <span v-if="rating_err" class="red--text">{{rating_err}}</span>
     <span v-if="reviewExist" class="red--text">{{review_err}}</span>


     <div class="mt-2 d-flex justify-space-between">
        <v-btn class="cyan" @click="submitReview">Submit</v-btn>
        <v-btn class="red" @click="close">Cancel</v-btn>
     </div>

    </v-card-text>
  
  </v-card>

 </template>


<script>

import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
 
    name: 'productReview',
    props: ['closeReviewDialog','Id','pName'],
    data: ()=>({
          
          comment: '',
          name: '',
          rating: null,
          userReview: {},
          reviewExist: false,
          review_err: '',
          comment_err: '',
          rating_err: false, 

    }),

    computed: {
        ...mapGetters(['user'])
    },

    async created(){
        
        this.name = this.user.data.FirstName +' '+ this.user.data.LastName

        let review = await axios.get('http://localhost:8000/reviews/',{params: {UserId: this.user.data.UserId,ProductId: this.Id}})
        this.userReview = review.data
        
        if(this.userReview){
            this.reviewExist = true 
        }
           
     
    },

    methods: {
         
         close(){
             
               this.closeReviewDialog()
               
               this.comment = ''
               this.rating = null
               this.review_err = ''
         
         },

         submitReview(){

           if(!this.validation()) return false
        
           if(this.reviewExist == false){
   
             axios.post('http://localhost:8000/reviews/',{
               
                UserId: this.user.data.UserId,
                ProductId: this.Id,
                Name: this.name,
                Comment: this.comment,
                Rating: this.rating,
                ProductName: this.pName,

             }).then(()=>{
               
               this.comment = ''
               this.name = ''
               this.rating = null
               this.closeReviewDialog()

            }).catch(()=>console.log)
        
        }else{
           this.review_err = 'You are only allowed to rate a product once'
         }
       },

       validation(){
           
           let valid = true 
           
           if(this.comment == ''){
             
              this.comment_err = 'Provide a comment'
               valid = false  
           
           }else if(this.rating == null){
             
             this.rating_err = 'Provide the rating'
             valid = false 
           
           }else {
               
               this.comment_err = ''
               this.rating_err = ''
               valid = true

           } 

           return valid
       }
    
    }


}
</script>

<style scoped>
.dialog{
  
  display: flex;
  justify-content: center;
   
    
}
</style>