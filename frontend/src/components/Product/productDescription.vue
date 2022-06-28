<template>
   <div>
         
         <v-card>
             <v-card-title class="cyan--text">
                 Description
             </v-card-title>

             <v-card-text class="black--text">
                 {{product.ProductDesc}}
             </v-card-text>
         </v-card>

   </div>    
</template>

<script>

import { mapGetters } from 'vuex'
//import axios from 'axios'

export default {
    name: 'productDescription',
    
    computed:{
         ...mapGetters(['product','user'])
    },


    created(){
        
        this.$store.dispatch('authenticateUser')
    
    }

}
</script>

<style scoped>

</style>