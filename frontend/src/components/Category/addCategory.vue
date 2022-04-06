<template>
   <div>
        
        <div class="cyan--text text-center">
            <h1>Add Category</h1>
        </div>

        <div>
            <form>
                <v-text-field 
                     label="Name"
                     color="#1F2833"
                     :error="name_err ? true : false "
                     :erro-messages="name_err"
                     filled
                     v-model="categoryName"
                     >

                </v-text-field>
                
                <v-text-field
                   label="subCategory"
                   color="#1F2833"
                   filled
                   :error='subcat_err ? true : false'
                   :error-messages="subcat_err"
                   v-model="subCategory">

                </v-text-field>
                <v-textarea
                       label="Description"
                       color="#1F2833"
                       filled
                       :error='desc_err ? true : false'
                       :error-messages='desc_err'
                       v-model="categoryDesc"
                 >

                </v-textarea>
                <div class="text-center">
                    <v-btn outlined  @click="add_Category" color="#1F2833">
                        Submit
                    </v-btn>
                </div>
            </form>
        </div>

   </div>    
</template>

<script>

import axios from 'axios'

export default {
    name: 'addCategory',
    data: ()=>({
         
         categoryName: '',
         categoryDesc: '',
         subCategory: '',
         name_err: '',
        desc_err: '',
        subcat_err: '',

    }),

    methods: {
          
          add_Category(){
                
                axios.post('http://localhost:8000/categories/addcategory',{
                    
                    categoryName: this.categoryName,
                    categoryDesc: this.categoryDesc,
                    subCategory: this.subCategory
                
                }).then(response=>{
                    
                    if(response){
                        this.$router.push('/managecategories')
                    }

                }).catch(err=>{
                    console.log(err)
                })

          },

          validate(){
             
             var valid = true 

             if(this.categoryName == ''){
                 this.name_err = 'required'
                 valid = false
             }else{
                 this.name_err = ''
             }

             if(this.subCategory == ''){
                 this.subcat_err = 'required'
                 valid = false 
             }else{
                 this.subcat_err = ''
             }

             if(this.categoryDesc == ''){
                 this.desc_err = 'required'
                 valid = false
             }else{
                this.desc_err = ''
             }

             return valid

          }

    }
}
</script>

<style>

</style>