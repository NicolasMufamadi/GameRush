<template>
    <div>
        
        <h1 class="cyan--text">Manage Reviews</h1>
        
        <div>
            <v-data-table
              :items="pendingReviews"
              :headers="headers"
               v-if="pendingReviews.length > 0"
            >

            <template  v-slot:[`item.actions`]="{item}">
              
                <v-btn icon @click="approveReview(item)"><v-icon  color='cyan'>mdi-check-circle</v-icon></v-btn>
                <v-btn icon @click="disapproveReview(item)"><v-icon color="red">mdi-alpha-x-circle</v-icon></v-btn>
            
            </template>


            </v-data-table> 
        </div>

        <v-dialog
               v-model="aproveDialog"
               transition="dialog-bottom-transition"
               max-width="500px"
        >
          <approveReview :close="closeApproveDialog" :review="review" />
        </v-dialog>

        <v-dialog
              v-model="disapproveDialog"
              transition="dialog-bottom-transition"
              max-width="500px"
        >
          <disapproveReview  :review="review" :close="closeDisapproveDialog"/>
        </v-dialog>

    <div>
       <v-card 
        v-if="pendingReviews.length == 0"
        class="mt-15 pt-10"  
        color="#F5F5F5"
          
       >
        <v-card-text>
            <div class="d-flex justify-center">
         
             <div>
             

                   <v-btn 
                   class="mb-2 ml-10"
                   x-large
                   outlined
                   fab
                   color="cyan"
               >
                <v-icon>mdi-shield-check</v-icon>   
                 <span class="items">0</span>
                    
               </v-btn>
    
               
               <p>All reviews are reviewed</p>
             
             </div>
       
            </div>

            <div class="mb-2 d-flex justify-center">
              <v-btn class="cyan white--text" to="/adminpanel">Admin Panel</v-btn>
            </div>
        

        </v-card-text>

    </v-card>
        </div>
    
    </div>
</template>

<script>

import axios from 'axios'
import { mapGetters } from 'vuex'
import approveReview from './approveReview.vue'
import disapproveReview from './disapproveReview.vue'

export default {
  
  name: 'manageReviews',
  
  components: {
    approveReview,
    disapproveReview
  },

  data: ()=> ({
     
     review: '',
     aproveDialog: false,
     disapproveDialog: '',
     pendingReviews: [],

  }),

  computed: {
    
    ...mapGetters(['user']),
    
    headers() {
        return [
            
                {
                    text: 'Reviewer',
                    align: 'start',
                    sortable: false,
                    value: 'Name'
                },

                {
                   text: 'Product',
                   sortable: false, 
                   value: 'ProductName'
                },

                {
                    text: 'Comment',
                    sortable: false,
                    value: 'Comment'
                },

                {
                    text: 'Rating',
                    value: 'Rating'
                },

                {
                    text: 'Status',
                    sortable: false,
                    value: 'Status'
                },


                {
                    text: 'Actions',
                    sortable: false,
                    value: 'actions'
                }
            
        ]
     }

  },


  beforeMount(){

        axios.post('http://localhost:8000/users/checkauth',this.user,{
          headers:{
            'content-type': 'text/json',
            'Authorization': 'Bearer'+ ' '+ localStorage.getItem('token')
          }
        }).then((response)=>{
              
              if(response.data.Authorization !== 'LoggedIn'){
                   
                    this.$router.push('/')
                    this.$store.dispatch('logout')
              
              }

        }).catch(console.log())
    
  },


  async created(){
    
    if(this.user != null && this.user.data.UserType == 'Admin'){
       
      let response = await axios.get('http://localhost:8000/reviews/getall')
      let reviews = response.data   
      console.log(reviews)
      this.pendingReviews = reviews.filter(review => review.Status == 'Pending')
      console.log(this.pendingReviews)

    }else{
       this.$router.push('/')
    } 

  },  


  methods: {
   
      approveReview(item){
           this.aproveDialog = true
           this.review = item
      },

      disapproveReview(item){
          this.disapproveDialog = true
          this.review = item  
      },

      closeApproveDialog(){
        this.aproveDialog = false 
      },

      closeDisapproveDialog(){
          this.disapproveDialog = false 
      }
     

  }


  
}
</script>

<style>
.no_reviews{
   display: flex;
   justify-content: center;
   margin: auto;
   
}
</style>