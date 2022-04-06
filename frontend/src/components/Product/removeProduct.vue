<template>
    <div>
        <v-card color="#1F2833">
            <v-card-title class="white--text  ml-16">Confirm Action</v-card-title>
            <v-card-text class="white--text text-center">
                Are you sure you want to remove this product
            </v-card-text>
                <div class="d-flex justify-space-around">
         
                     <v-btn plain color="error" @click="removeProduct">Yes</v-btn>
                     <v-btn plain color="cyan" @click="closeDialog">No</v-btn>
        
                </div>
        </v-card>
    </div>
</template>
<script>

import axios from 'axios'

export default {
    name: 'removeProduct',
    props: ['close','Id'],
    methods:{

        removeProduct(){
            console.log(this.Id)
           axios.delete(`http://localhost:8000/products/removeproduct/${this.Id}`).then(response=>{
               if(response){
                   this.$router.go()
                   this.closeDialog()
               }
           }).catch(err=>{
               console.log(err)
           })
        },

        closeDialog(){

            this.close()
            console.log(this.Id)

        }

    }

}
</script>
<style>

</style>