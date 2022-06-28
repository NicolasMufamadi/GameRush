<template>
    <v-card>
         <h2 class="text-center cyan--text"> Confirm Action </h2>
        <v-card-text>
            <p class="text-center black--text mt-2"> Do you want to remove this Address? </p>
        </v-card-text>
        <div class='d-flex justify-space-between'>
            <v-btn plain color='cyan' class="ml-2" @click="cancelDelete">Cancel</v-btn>
            <v-btn plain color='red' class="mr-2" @click="removeAddress">Delete</v-btn>
        </div>
    </v-card>
</template>

<script>
export default {
     name: 'removeAddress',
     props: ['cancelDialog','deleteAddress'],
     
     methods: {
         
         cancelDelete(){
               this.cancelDialog()
         },

       removeAddress(){
             
             this.deleteAddress()

       }
           
     }
}
</script>

<style scoped>

</style>