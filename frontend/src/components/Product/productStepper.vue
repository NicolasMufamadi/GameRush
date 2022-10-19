<template>
<div>
    
    <div class="cyan--text">
        <h1>Add Product</h1>
    </div>

    <div>

       <v-stepper color="cyan" vertical v-model="step">
           <v-stepper-header class="cyan--text" >
               <v-stepper-step step="1" color="cyan" :complete="step > 1" >
                   Details
               </v-stepper-step>

               <v-divider></v-divider>

               <v-stepper-step step="2" color="cyan" :complete="step > 2">
                   Description
               </v-stepper-step>

           <v-divider></v-divider>

            <v-stepper-step step="3" color="cyan" :complete="step > 3">
               Image
            </v-stepper-step>

           </v-stepper-header>

           <v-stepper-items>
               <v-stepper-content step="1">
     <div class="mt-5">
      <v-card>
        <v-card-title class="cyan--text">Product Details</v-card-title>
         <v-form>

            <v-container>
                <v-row>
                    <v-col class="mr-10" cols="12" md="4">
                        <v-text-field v-model="ProductName" filled label="Name" color="cyan"></v-text-field>
                    </v-col>

                    <v-col class="ml-16" cols="12" md="3">
                        <v-text-field :error='Price_err ? true : false' :error-messages='Price_err' v-model="ProductPrice" filled label="Price" color="cyan"></v-text-field>

                    </v-col>

                    <v-col class="ml-16" col="12" md="3">
                        <v-text-field :error='Quant_err ? true : false' :error-messages='Quant_err' v-model="ProductQuant" filled label="Quantity" color="cyan"></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                       <v-textarea v-model="ProductKeywrds" filled label="Keywords to help user to search for the game" color="cyan">

                       </v-textarea>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6" sm="4">
                        <v-select 
                            v-model="Category"
                           :items="Categories"
                           filled 
                           label="Category" 
                           color="cyan">
                        </v-select>
                    </v-col>

                    <v-col cols="6" sm="4">
                          <v-select
                            v-model="SubCategory"
                            :items="SubCategories"
                             filled 
                             label="Subcategory"
                             color="cyan"  
                          >

                          </v-select>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                        <v-btn dark color="cyan" @click="validateForm">Next</v-btn>
                    </v-col>
                </v-row>
                <div class="mt-3">
                     <strong class="error">{{Form_err}}</strong>
                </div>
            </v-container>

          </v-form>
        </v-card>
       </div>

      </v-stepper-content>

      <v-stepper-content step="2">
          <v-card>
              <v-card-title class="cyan--text">Product Description</v-card-title>
              <v-card-text>
             <v-form>
                 <v-textarea v-model="ProductDesc" filled label="Add product description" color="cyan">

                 </v-textarea>
                 <v-card-actions>
                     <v-btn color="teal" @click="step = 1">Back</v-btn>
                     <v-btn class="ml-5" color="cyan" @click="step = 3">Next</v-btn>
                 </v-card-actions>
             </v-form>
            </v-card-text>
          </v-card>
      </v-stepper-content>

      <v-stepper-content step="3">
          <v-card>
              <v-card-title class="cyan--text">Add Image for Product</v-card-title>
              <v-card-text>
                 <addProduct 
                 
                 :ProductName="ProductName"
                 :ProductPrice="ProductPrice"
                 :ProductDesc="ProductDesc"
                 :ProductKeywrds="ProductKeywrds"
                 :ProductQuant="ProductQuant"
                 :Category="Category"
                 :SubCategory="SubCategory"
                 
                 />
              </v-card-text>
               <v-card-actions>          
                   <div>
                      <v-btn class="teal mr-5" @click="step = 2">Back</v-btn>
                   
                   </div>
               </v-card-actions>
          </v-card>
      </v-stepper-content>
    </v-stepper-items>


  </v-stepper>
 </div>

</div>
</template>

<script>

import axios from 'axios'
import addProduct from './addProduct.vue'

export default {
    name: 'productStepper',
    components:{
       addProduct
    },
    data:()=>({
        step: 1,
        ProductName: '',
        ProductPrice: '',
        ProductQuant: '', 
        ProductDesc: '',
        ProductKeywrds: '',
        Form_err: '',
        Price_err: '',
        file_err: '',
        Quant_err: '',
        File: '',
        Items: [],
        Categories: [],
        SubCategories: [],
        SubCategory: '',
        Category: ''


    }),

    created(){

          axios.get('http://localhost:8000/categories/getcategories')
          .then(response=>{
              if(response){
                  this.Items = response.data
                
                  for(var i =0; i < this.Items.length; i++){

                      this.Category = this.Items[i].categoryName
                    

                      if(!this.Categories.includes(this.Category)){

                          this.Categories.push(this.Category)
                      }

                        this.SubCategory = this.Items[i].subCategory
                        this.SubCategories.push(this.SubCategory)


                  }

                  console.log(this.Categories)

              }
          }).catch(err=>{
              console.log(err)
          })

    },

    methods:{

        validateForm(){
                 let valid = true
              
                 if(this.ProductName == '' || this.ProductPrice =='' || this.ProductQuant =='' || this.ProductKeywrds ==''){
                     this.Form_err = 'Please Provide all information for better user experience' 
                     valid = false

                 }      
                 else{
                     this.Form_err = null
                 }    
                 
                 if((this.ProductPrice.trim() - 0) != this.ProductPrice && (''+this.ProductPrice).trim().length > 0){
            
                     this.Price_err = 'Enter numbers only'
                     valid = false
                 }else{

                     this.Price_err = null
                    
                 }

                 if((this.ProductQuant.trim() - 0) != this.ProductQuant.trim()){
                      this.Quant_err = 'Enter number value'
                      valid = false
                 }else{

                     this.Quant_err = null
                 
                 }

                 if(valid == true){
                     this.step = 2
                 }

                

               return valid

        },

        getImage(file){
            
            this.File = file
            console.log(this.File)

        },

    

    }
}
</script>

<style>

</style>