<template>
  <div>
   
  <v-card >
         
   <h1 class="cyan--text text-center">Review product</h1>
  
    <v-card-text>
      <span>Status:</span>

      <v-chip v-if="status === 'Approved'"  class="ma-2 teal">
           {{status}}
      </v-chip>

      <v-chip v-else-if="status === 'Disapproved'" class="ma-2 red">
           {{status}}
      </v-chip>
      
      <v-chip v-else class="ma-2 grey">
           {{status}}
      </v-chip>
       
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
     >
          
     </v-textarea>
    
    <h4>Rating</h4>
 
    <v-rating
         v-model="rating"
         color="yellow"
         large

     >

     </v-rating>
  
     <v-btn class="red" @click="close">Cancel</v-btn>

    </v-card-text>
  
  </v-card>

  </div> 
</template>

<script>

import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
    
    name: 'viewReview',
    props: ['Id','closeDialog'],
    data: ()=>({
        
        name: '',
        comment: '',
        rating: null,
        status: ''

    }),

    computed: {
       ...mapGetters(['user'])
    },

   async created(){
          
        let obj = await axios.get('http://localhost:8000/reviews/',{params: {UserId: this.user.data.UserId, ProductId: this.Id}})
       
        this.name = obj.data.Name
        this.comment = obj.data.Comment
        this.rating = obj.data.Rating
        this.status = obj.data.Status
        console.log(this.status)

   },

   methods: {
       
       close(){
           this.closeDialog()
           this.$router.go('/')
       }

   }

}
</script>

<style>

</style>