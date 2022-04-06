<template>
   <div>
        
       <v-card color="#1F2833">

         <v-card-title class="cyan--text">
          Update Category
        </v-card-title>        
   
           <v-card-text>
               <form action="">
                   <v-text-field 
                         label='Name' 
                         solo
                         v-model="categoryName">

                   </v-text-field>

                   <v-text-field 
                          label='subCategory' 
                          solo
                          v-model="subCategory">

                   </v-text-field>

                   <v-text-field 
                         label='Description' 
                         solo
                         v-model="categoryDesc"> 

                   </v-text-field>
                
                 <div class="d-flex justify-space-between">

                   <v-btn class="ml-3" @click="updateCategory" color='cyan'>
                       Submit
                   </v-btn>

                   <v-btn class="mr-3" color='cyan' @click="close">
                       close
                   </v-btn>
                 </div>

               </form>
           </v-card-text>
       </v-card>

   </div>    
</template>

<script>

import axios from 'axios'

export default {
    name: 'addCategory',
    props: ['Item','close'],
    data: ()=>({
         
         Id: '',
         categoryName: '',
         categoryDesc: '',
         subCategory: ''

    }),

    created(){
       
       this.Id = this.Item.categoryId
       this.categoryName = this.Item.categoryName
       this.categoryDesc = this.Item.categoryDesc
       this.subCategory = this.Item.subCategory

    },

    methods: {
          
          updateCategory(){
              
                axios.put('http://localhost:8000/categories/updatecategory/'+this.Id,{
                    categoryName: this.categoryName,
                    categoryDesc: this.categoryDesc,
                    subCategory: this.subCategory
                }).then(response=>{
                    if(response){
                        this.$router.go('')
                    }
                }).catch(err=>{
                    console.log(err)
                })

          },

          cancel(){
              this.close()
          }

    }
}
</script>

<style>

</style>