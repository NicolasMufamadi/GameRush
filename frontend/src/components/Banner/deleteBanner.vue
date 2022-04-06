<template>


             <v-card color="#1F2833">
                 <v-card-title class="cyan--text ml-16"><h4 class="ml-4 text-center">
                    Confirm Action</h4>
                </v-card-title>
                 <v-card-text class="white--text text-center">
                     Are you sure you want to remove this banner?
                 </v-card-text>
            
                     <div class="d-flex justify-space-between"> 
                         <v-btn class="ml-5" plain color="red" @click="removeBanner">yes</v-btn> 
                         <v-btn class="mr-5" plain color="cyan" @click="closeDialog">cancel</v-btn>
                     </div>
                            
             </v-card>


</template>

<script>

import axios from 'axios'

export default {
    
    name: 'deleteBanner',
    props: ['removeDialog','banner'],
    data:()=>({
       Id: '',
    }),

   created(){
       this.Id = this.banner.bannerId
       console.log(this.Id)
   },

    methods:{

           removeBanner(){

                   axios.delete('http://localhost:8000/banners/removebanner/'+this.Id).then(response=>{
                       if(response){
                           console.log(response)
                           this.$router.go('')
                       }
                   }).catch(err=>{
                       console.log(err)
                   })

           },
           
           closeDialog(){
               
               this.removeDialog() 
               this.$router.go('')

           }

    }

}
</script>

<style>

</style>