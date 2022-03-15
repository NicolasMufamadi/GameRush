<template>
    <div >

      <div class="pl-3 pb-2 cyan--text ">
        <h1>Admin Panel</h1>
      </div>

      <div class="d-flex flex-wrap justify-space-around">

         <v-sheet class="sheet" shaped rounded elevation=1 color="cyan" width="250" @click="manageusers">
             <v-icon  class="pl-10" size="150" >mdi-account</v-icon>
             <div class="pl-16">
                 <p class="pl-7 pb-3">Users</p>
             </div>
         </v-sheet>

        <v-sheet class="sheet" shaped rounded elevation=1 color="#1F2833" width="250" @click="manageproducts">
             <v-icon color="cyan" class="pl-10" size="150">mdi-archive</v-icon>
             <div class="pl-16 cyan--text">
                 <p class="pl-5 pb-3">Products</p>
             </div>
         </v-sheet>

         <v-sheet class="sheet" shaped rounded elevation=1 color="cyan" width="250">
             <v-icon class="pl-10" size="150">mdi-star</v-icon>
            <div class="pl-16">
                 <p class="pl-7 pb-3">Reviews</p>
             </div>
         </v-sheet>

         <v-sheet class="sheet" shaped rounded elevation=1 color="#1F2833" width="250">
             <v-icon color="cyan" class="pl-10" size="150">mdi-palette-swatch-variant</v-icon>
             <div class="pl-16 cyan--text">
                 <p class="pl-7 pb-3">Categories</p>
             </div>
         </v-sheet>

      </div>

      <div class="mt-4 mb-10 d-flex flex-wrap justify-space-around">

         <v-sheet class="sheet" shaped rounded elevation=1 color="cyan" width="250">
             <v-icon class="pl-10" size="150">mdi-ticket-percent</v-icon>
             <div class="pl-16">
                 <p class="pl-7 pb-3">Coupons</p>
             </div>
         </v-sheet>

         <v-sheet class="sheet" shaped rounded elevation=1 color="#1F2833" width="250">
             <v-icon color="cyan" class="pl-10" size="150">mdi-folder-plus</v-icon>
             <div class="pl-16 cyan--text">
                 <p class="pl-7 pb-3">Orders</p>
             </div>
         </v-sheet>

          <v-sheet class="sheet" shaped rounded elevation=1 color="cyan" width="250">
             <v-icon class="pl-10" size="150">mdi-folder-multiple-image</v-icon>
             <div class="pl-16">
                 <p class="pl-7 pb-3">Banners</p>
             </div>
         </v-sheet>

        <v-sheet class="sheet" shaped rounded elevation=1 color="#1F2833" width="250">
             <v-icon color="cyan" class="pl-10" size="150">mdi-chart-areaspline</v-icon>
             <div class="pl-16 cyan--text">
                 <p class="pl-7 pb-3">Reports</p>
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
         Role: ''
    }),
   computed:{
      ...mapGetters(['user'])
   },

   created(){
       this.Role = this.user.data.UserType
       console.log(this.Role)

   },
 
 beforeMount(){
       
    if(this.Role == 'Admin'){

        
        axios.post('http://localhost:8000/users/checkauth',this.user,{
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
    
      }else{
          this.$router.push('/')
      }
  },


    methods:{
        manageusers(){
            this.$router.push('/manageuser')
        },

        manageproducts(){
            this.$router.push('/manageproducts')
        }
    }
}
</script>

<style>
.sheet:hover{
  cursor: pointer;
}
</style>