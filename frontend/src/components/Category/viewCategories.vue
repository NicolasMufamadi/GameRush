<template>
    <div>
         <div class="cyan--text">
             <h1>Manage Categories</h1>
         </div>

         <div>
             <v-btn color="cyan" to="/addcategory">
             <v-icon>mdi-plus</v-icon>Add Category
            </v-btn>
         </div>

         <div class="mt-2">
             <v-text-field 
             label="Search Category"
             color="#1F2833"
             v-model="search">

             </v-text-field>
         </div>

         <div>
             <v-data-table :headers="headers" :items="categories" :search="search">
                  <template v-slot:[`item.actions`]="{ item }">
                     
                     <v-icon small color="red" @click="deleteItem(item)">mdi-delete</v-icon>
                    <v-icon class="ml-2" small color="cyan" @click="editItem(item)">mdi-pencil</v-icon>
                  </template>
             </v-data-table>
         </div>
         <v-dialog 
              transition="dialog-bottom-transition"
              max-width="500"
              v-model="removeCategoryDialog">
            
            <removeCategory :Id="Id" :removeCategoryDialog="cancelDelete" />

         </v-dialog>

         <v-dialog
               transition="dialog-top-transition"
               max-width="900"
               v-model="editCategoryDialog"
         >

          <editCategory :Item='Item' :close='cancelEdit'/>

         </v-dialog>
    </div>
</template>

<script>

import axios from 'axios'
import removeCategory from './removeCategory'
import editCategory from './editCategory'

export default {
    name: 'viewCategory',
    components: {
        removeCategory,
        editCategory
    },
    data:()=>({
          categories: [],
          search: '',
          Id: '',
          Item: '',
          editCategoryDialog: false,
          removeCategoryDialog: false,
          headers: [
                  {
                      text: 'CategoryName',
                      sortable: false,
                      align: 'start',
                      value: 'categoryName'
                  },

                  {
                      text: 'SubCategory',
                      sortable: false,
                      value: 'subCategory'
                  },

                  {
                      text: 'Description',
                      sortable: false,
                      filterable: 'false',
                      value: 'categoryDesc'
                  },

                  {
                      text: 'Actions',
                      sortable: false,
                      value: 'actions'
                  }

          ]
    }),

created(){
     
        axios.get('http://localhost:8000/categories/getcategories')
        .then(response=>{
            if(response){
                this.categories = response.data
                console.log(response)
            }
        }).catch(err=>{
            console.log(err)
        })

    },

beforeMount(){

        axios.post('http://localhost:8000/users/checkauth',this.user,{
          headers:{
            'content-type': 'text/json',
            'Authorization': 'Bearer'+ ' '+ localStorage.getItem('token')
          }
        }).then((response)=>{
              
              if(response.data.Authorization !== 'LoggedIn'){
                   
                    this.$router.push('/')
                    this.$store.dispatch('logout')
              
              }

        }).catch(console.log())
    
  },

    methods: {
         deleteItem(item){
               this.Id = item.categoryId
               this.removeCategoryDialog = true
         },

         cancelDelete(){
              this.removeCategoryDialog = false
         },

         editItem(item){
             this.Item = item
             this.editCategoryDialog = true
         },

         cancelEdit(){
             this.editCategoryDialog = false
         }
    }

}
</script>

<style>

</style>