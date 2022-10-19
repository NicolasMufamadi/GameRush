<template>
  <v-card>
    <h2 class="text-center cyan--text">Filter Products</h2>
     <v-card-text>
         <v-row>
            <v-col cols="6">
                <h3 class="text-center cyan--text">Prices</h3>
               <v-select
                    :items="prices"
                    label="Select Price"
                    filled
                    color="cyan"
               >

               </v-select>
            </v-col>
            <v-col cols="6">
                <h3 class="text-center cyan--text">Categories</h3>
               <v-select
                    :items="categories"
                    label="Select Category"
                    filled
                    color="cyan"
               >

               </v-select>
            </v-col>
         </v-row>
         <v-row>
            <v-col cols="6">
                <h3 class="text-center cyan--text">Ratings</h3>
               <v-select
                    :items="ratings"
                    label="Select rating"
                    filled
                    color="cyan"
               >

               </v-select>
            </v-col>
            <v-col cols="6">
                <h3 class="text-center cyan--text">Availability</h3>
               <v-select
                    :items="statuses" 
                    label="Select status"
                    filled
                    color="cyan"
               >

               </v-select>
            </v-col>
         </v-row>
     </v-card-text>
     <div class="d-flex justify-space-between">
         <v-btn class="ml-2 mb-2 teal" @click="filter">Filter</v-btn>
         <v-btn  class="mr-2 mb-2 red" @click="cancel">Cancel</v-btn>
     </div>
  </v-card>
</template>

<script>
export default {
    name: 'filterProducts',
    props: ['cancel','filter'],
    data: () => ({
         ratings: [
            'from 0 to 1',
            'from 2 to 3',
            'from 4 to 5'
         ],

         prices: [
             'From R100 to R500',
             'From R500 to R750',
             'from R750 to R1000',
             'from R1250 to R1500',
             'from R1750 to R2000',
             'from R2000 to R2250'
         ],
         categories: [],

         statuses: [
            'In-Stock',
            'Out-Of-Stock'
         ]
    }),

    created() {
         
    }
}
</script>

<style>

</style>