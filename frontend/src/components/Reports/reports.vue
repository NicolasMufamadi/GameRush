<template>
    <div>
        <h1 class="cyan--text">Reports </h1>

        <div class="row mt-4">
            
            <v-col :cols="3">
                <v-card height="100%">
                    <div class="text-center">
                        <v-icon size="80" class="cyan--text pa-4">mdi-account</v-icon>
                        <p>No. of Users</p>
                        <h2>{{report.nUsers}}</h2>
                    </div>
                </v-card>
            </v-col>

            <v-col :cols="3"> 
               
                <v-card height="100%">
                    <div class="text-center">
                       <v-icon size="80" class="cyan--text pa-4">mdi-account-remove</v-icon>
                       <p class="ml-2">No. of Banned Users</p>
                       <h2>{{report.nBannedUsers}}</h2>
                    </div>
                </v-card>

            </v-col>

            <v-col :cols="3">
               <v-card height="100%">
                  <div class="text-center">
                      <v-icon size="80" class="cyan--text pa-4">mdi-truck-check</v-icon>  
                      <p>No. of Delivered Orders</p>
                      <h2>{{report.nOrders}}</h2>
                  </div>
               </v-card>
            </v-col>

            <v-col :cols="3">
               <v-card height="100%">
                   <div class="text-center">
                      <v-icon size="80" class="cyan--text pa-4">mdi-star</v-icon>
                      <p>No. of  Approved Reviews</p>
                      <h2>{{report.nReviews}}</h2>
                   </div>
               </v-card> 
            </v-col>

            <v-col :cols="3">
                <v-card height="100%">
                    <div class="text-center">
                        <v-icon size="80" class="cyan--text pa-4">mdi-archive</v-icon>
                        <p>No. of Products</p>
                        <h2>{{report.nProducts}}</h2>
                    </div>
                </v-card>
            </v-col>

            <v-col :cols="3">
               <v-card height="100%">
                   <div class="text-center">
                        <v-icon size="80" class="cyan--text pa-4">mdi-archive-lock-open</v-icon>  
                        <p>Products Out-Of-Stock</p>
                        <h2>{{report.outOfStockProducts}}</h2>
                   </div>   
               </v-card>  
            </v-col>

            <v-col :cols="3">
               <v-card height="100%">
                   <div class="text-center">
                        <v-icon size="80" class="cyan--text pa-4">mdi-archive-star</v-icon>  
                        <p>No. of Product In-Stock</p>
                        <h2>{{report.totalItemsInStock}}</h2>
                   </div>   
               </v-card>  
            </v-col>


            <v-col :cols="3">
               <v-card height="100%">
                   <div class="text-center">
                        <v-icon size="80" class="cyan--text pa-4">mdi-apps-box</v-icon>
                        <p>No. of Categories</p>
                        <h2>{{report.nCategories}}</h2>  
                   </div>   
               </v-card>  
            </v-col>
           
        </div>
       
            <h1 class="cyan--text ml-2 mt-2">Categories Report</h1>

           <div class="row text-center">
            <v-col 
                :cols="3"
                v-for="category in report.catgrs"
                :key="category.CategoryId">
              <v-card height="100%">
                  <h2 class="cyan--text">{{category.categoryName}}</h2> 
                  <p v-if="category.noGames == 1">{{category.subCategory}}: {{category.noGames}} Game</p>
                  <p v-else-if="category.noGames == 0">{{category.subCategory}}: {{category.noGames}}</p>
                  <p v-else>{{category.subCategory}}: {{category.noGames}} Games </p>
              </v-card>
           </v-col>
          </div>
    
    </div>
</template>

<script>

import axios from 'axios'

export default {
    name: 'reports',
    
    data: () => ({
        report: {}
    }),

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
       let res = await axios('http://localhost:8000/report/')
       this.report = res.data
       console.log(this.report)
    }
}
</script>

<style>
</style>