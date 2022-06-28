<template>
    <div >

      <div class="pl-3 pb-2 cyan--text ">
        <h1>Admin Panel</h1>
      </div>

      <div class="d-flex flex-wrap justify-space-around">

         <v-sheet 
                class="sheet" 
                shaped 
                rounded 
                elevation=1 
                color="cyan" 
                width="200"
                height="150" 
                @click="manageUsers">
             <v-icon  class="pl-13 pt-2" size="100" >mdi-account</v-icon>
             <div class="pl-12">
                 <p class="pl-8 pb-3">Users</p>
             </div>
         </v-sheet>

        <v-sheet 
             class="sheet" 
             shaped 
             rounded 
             elevation=1 
             color="#1F2833"
             height="150" 
             width="200" 
             @click="manageProducts">
             <v-icon color="cyan" class="pl-13 pt-2" size="100">mdi-archive</v-icon>
             <div class="pl-12 cyan--text">
                 <p class="pl-8 pb-3">Products</p>
             </div>
         </v-sheet>

         <v-sheet 
                class="sheet" 
                shaped 
                rounded 
                elevation=1 
                color="cyan"
                height="150" 
                width="200">
             <v-icon class="pl-13 pt-2" size="100">mdi-star</v-icon>
            <div class="pl-12">
                 <p class="pl-8 pb-3">Reviews</p>
             </div>
         </v-sheet>

         <v-sheet 
               class="sheet" 
               shaped 
               rounded 
               elevation=1 
               color="#1F2833"
               height="150" 
               width="200"
               @click="manageCategories">
             <v-icon color="cyan" class="pl-13 pt-2" size="100">mdi-toolbox</v-icon>
             <div class="pl-12 cyan--text">
                 <p class="pl-8 pb-3">Categories</p>
             </div>
         </v-sheet>

      </div>

      <div class="mt-4 mb-10 d-flex flex-wrap justify-space-around">

         <v-sheet 
               class="sheet" 
               shaped 
               rounded 
               elevation=1 
               color="cyan"
               height="150" 
               width="200"
               @click="manageCuopons">
             <v-icon class="pl-13 pt-2" size="100">mdi-ticket-percent</v-icon>
             <div class="pl-12">
                 <p class="pl-6 pb-3">Coupons</p>
             </div>
         </v-sheet>

         <v-sheet 
              class="sheet" 
              shaped 
              rounded 
              elevation=1 
              color="#1F2833" 
              height="150"
              width="200"
              @click="manageOrders">
             <v-icon color="cyan" class="pl-13 pt-2" size="100">mdi-folder-plus</v-icon>
             <div class="pl-12 cyan--text">
                 <p class="pl-8 pb-3">Orders</p>
             </div>
         </v-sheet>

          <v-sheet 
               class="sheet" 
               shaped 
               rounded 
               elevation=1 
               color="cyan"
               height="150" 
               width="200" 
               @click="manageBanners">
             <v-icon class="pl-13 pt-2" size="100">mdi-folder-multiple-image</v-icon>
             <div class="pl-12">
                 <p class="pl-8 pb-3">Banners</p>
             </div>
         </v-sheet>

        <v-sheet 
             class="sheet" 
             shaped 
             rounded 
             elevation=1 
             color="#1F2833" 
             height="150" 
             width="200">
             <v-icon color="cyan" class="pl-13 pt-2" size="100">mdi-chart-areaspline</v-icon>
             <div class="pl-12 cyan--text">
                 <p class="pl-8 pb-3">Reports</p>
             </div>
         </v-sheet>

      </div>
 
    </div>

</template>

<script>

import axios from 'axios'
import {mapGetters} from 'vuex'

export default {
    name: "AdminPanel",
    data:()=>({
         Role: '',
         data: '',
    }),
   computed:{
      ...mapGetters(['user'])
   },

   created(){
       if(this.user !== null && this.user.data.UserType === 'Admin'){
          this.Role = this.user.data.UserType
          this.data = this.user
      }else{
          this.$router.push('/')
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


    methods:{
        
        manageUsers(){
            this.$router.push('/manageusers')
        },

        manageProducts(){
            this.$router.push('/manageproducts')
        },

        manageBanners(){
            this.$router.push('/managebanners')
        },

        manageCategories(){
            this.$router.push('/managecategories')
        },

        manageCuopons(){
            this.$router.push('/managecuopons')
        },

        manageOrders(){
           this.$router.push('/manageorders')
        }


    }
}
</script>

<style>
.sheet:hover{
  cursor: pointer;
}
</style>