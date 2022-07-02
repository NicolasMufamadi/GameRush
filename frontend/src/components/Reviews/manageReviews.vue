<template>
    <div>
        
        <h1 class="cyan--text">Manage Reviews</h1>
        
        <div>
            <v-data-table
              :items="reviews"
              :headers="headers"
            >

            <template v-slot:[`item.actions`]="{item}">
              
              <v-menu offset-y>
                <template v-slot:activator="{on,attrs}">
                    
                    <v-btn icon v-on="on" v-bind="attrs" @click="editItem(item)">
                      <v-icon>mdi-dots-vertical</v-icon>    
                    </v-btn> 
                
                </template>
                
                <v-list>
                    <v-list-item>
                        <v-list-item-icon>mdi-window-close</v-list-item-icon>
                        <v-list-content>
                            <v-list-item-title>Disapprove</v-list-item-title>
                        </v-list-content>
                    </v-list-item>
                </v-list>

               </v-menu>
            
            </template>

            </v-data-table> 
        </div>
    
    </div>
</template>

<script>

import axios from 'axios'
import { mapGetters } from 'vuex'


export default {
  name: 'manageReviews',
  data: ()=> ({
     
     reviews: []

  }),

  computed: {
    
    ...mapGetters(['user']),
    
    headers() {
        return [
            
                {
                    text: 'ReviewId',
                    align: 'start',
                    sortable: false,
                    value: 'ReviewId'
                },

                {
                   text: 'Product',
                   sortable: false, 
                   value: 'ProductName'
                },

                {
                    text: 'Comment',
                    sortable: false,
                    value: 'Comment'
                },

                {
                    text: 'Rating',
                    value: 'Rating'
                },

                {
                    text: 'Status',
                    sortable: false,
                    value: 'Status'
                },


                {
                    text: 'Actions',
                    sortable: false,
                    value: 'actions'
                }
            
        ]
     }

  },


  async created(){
      
      let response = await axios.get('http://localhost:8000/reviews/getall')
      this.reviews = response.data        

  }


  
}
</script>

<style>

</style>