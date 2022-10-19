<template>
    <div>
        <v-row class="ml-2 mt-2">
            <v-menu offset-y small>
                <template v-slot:activator="{on,attrs}">
                    <v-btn class="mr-2 pa-5 cyan"
                           v-bind="attrs"
                           v-on="on"
                    ><v-icon>mdi-sort</v-icon> Sort
                    </v-btn>
                </template>

                <v-list dense v-for="(sort,index) in sorts" :key="index">
                    <v-list-item 
                            color="teal"
                            :class="sort.value == $route.query.sort ? 'cyan' : ''" 
                            @click="sortProducts(sort.value)">
                        <v-list-item-title>{{sort.name}}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
          <v-btn class="ml-2 pa-5 teal" @click="filterModel = !filterModel"><v-icon>mdi-filter-variant</v-icon> Filter</v-btn> 
        </v-row>
        
     <div class="mt-4">
           <viewProductsVue />
     </div>

     <v-dialog
         v-model="filterModel"
         transition="dialog-top-transition"
         persistent
     >
      <filterProducts :cancel="cancelDialog" :filter="filterProducts"/>
     </v-dialog>

    </div>
</template>

<script>

import viewProductsVue from './viewProducts.vue'
import filterProducts from './filterProducts.vue'
//import axios from 'axios'

export default {
  
    name: 'viewGames',
  
    components: {
       viewProductsVue,
       filterProducts
    },

    props: ['order'],

    data: () => ({
       
       sorts: [
           {
              name: 'Name [A - Z]',
              value: 'name'
           },
           
           {
              name: 'Name [Z - A]',
              value: '-name'

           },
           
           {
              name: 'Price [low - high]',
              value: 'price'   
           },

           {
              name: 'Price [high - low]',
              value: '-price'
           },

           {
              name: 'Rating [low - high]',
              value: 'rating'
           },

           {
              name: 'Rating [high - low]',
              value: '-rating'
           },

           {
              name: 'date [oldest - latest]',
              value: 'created_at'
           },

           {
              name: 'Date [latest - oldest]',
              value: '-created_at'
           }
       ],

       filterModel: false,

       request: null

    }),



    methods: {
        sortProducts(val, replace = false){
            console.log(val)
            let query = {...this.$route.query}
            delete query.page
            query.sort = val 
            if(replace) this.$router.replace({query})
            else this.$router.push({query})
            console.log(query)

        },

        filterProducts(){

        },

        cancelDialog(){
            this.filterModel = false 
        }
    }



}
</script>

<style>

</style>