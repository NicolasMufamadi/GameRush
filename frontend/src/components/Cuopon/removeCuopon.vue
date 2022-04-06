<template>
    <div>
        <v-card color='#1F2833'>
            <v-card-title class="cyan--text ml-16"><h4 class="ml-16">Confirm Action</h4></v-card-title>
            <v-card-text class="white--text text-center">Are you sure you want to remove this cuopon</v-card-text>
            <div class="d-flex justify-space-between">

                <v-btn class="ml-3" text color='red' @click="deleteCuopon">Yes</v-btn>
                <v-btn class="mr-3" text color='cyan' @click="cancel">Cancel</v-btn>

            </div>
        </v-card>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    name: 'removeCuopon',
    props: ['Item','closeRemoveCuoponDialog'],
    data: ()=>({
          
          Id: ''

    }),

    created(){

        this.Id = this.Item.cuoponId
        console.log(this.Id)

    },

    methods: {
        
         deleteCuopon(){
                
                axios.delete('http://localhost:8000/cuopons/removecuopon/'+this.Id)
                .then(response=>{
                    if(response){
                        this.$router.go('')
                    }
                }).catch(err=>{
                    console.log(err)
                })

         },
         
         cancel(){
               
               this.closeRemoveCuoponDialog()

         }

    }
}
</script>

<style>

</style>