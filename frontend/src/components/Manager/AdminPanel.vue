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
                @click="manageusers">
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
             @click="manageproducts">
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
               @click="managecategories">
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
               @click="managecuopons">
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
              width="200">
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
               @click="managebanners">
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
       if(this.user !== null){
          this.Role = this.user.data.UserType
          this.data = this.user
      }else{
          this.$router.push('/')
      }

   },
 
 beforeMount(){
       
    if(this.Role == 'Admin'){
       
        
        axios.post('http://localhost:8000/users/checkauth',this.data,{
            headers:{
                'content-type': 'text/json',
            'Authorization': 'Bearer'+ ' '+ localStorage.getItem('token')
          }
        }).then(data=>{
            console.log(data)
        }).catch(()=>{
            
            this.$router.push('/')
            this.$store.dispatch('logout')
        })
    
      }
  },


    methods:{
        manageusers(){
            this.$router.push('/manageusers')
        },

        manageproducts(){
            this.$router.push('/manageproducts')
        },

        managebanners(){
            this.$router.push('/managebanners')
        },

        managecategories(){
            this.$router.push('/managecategories')
        },

        managecuopons(){
            this.$router.push('/managecuopons')
        }
    }
}
</script>

<style>
.sheet:hover{
  cursor: pointer;
}
</style>