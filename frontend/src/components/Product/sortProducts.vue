<template>
    <div>
          <v-menu offset-y>
               <template v-slot:activator="{on,attrs}">
                   <v-btn v-on="on" v-bind="attrs" outlined class="mr-3"><v-icon>mdi-abacus</v-icon>Sort</v-btn>
            </template>
             <v-list>
                 <v-list-item   
                         v-for="(item, index) in sortArr"
                         :key="index"
                         @click="sort"
                 >
                     <v-list-item-title
                       
                     >
                       {{item.name}}
                     </v-list-item-title>
                 </v-list-item>
             </v-list>
         </v-menu>
      </div>
</template>

<script>
export default {
    
    name: 'sortProduct',
    data:()=>({

          sortArr: [
              {
                  name: 'Latest',
                  value: ''
              },

              {
                  name: 'Best Selling'
              },
          ]

    }),

    methods: {
        sort(){

              

        }
    }

}
</script>

<style>

</style>