<template>
<div>
    
    <div class="cyan--text">
        <h1>Edit Product</h1>
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
        <v-card-title class="cyan--text">Update Product Details</v-card-title>
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
                        <v-text-field v-model="ProductQuant" filled label="Quantity" color="cyan"></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                       <v-textarea v-model="ProductKeywrds" filled label="Keywords to help user to search for the game" color="cyan">

                       </v-textarea>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="4">
                        <v-select filled label="Category" color="cyan"></v-select>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                        <v-btn dark color="#1F2833" @click="updateStep1">Update</v-btn>
                        <v-btn class="ml-5 cyan" dark  @click="validateForm">Next</v-btn>
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
              <v-card-title class="cyan--text">Update Product Description</v-card-title>
              <v-card-text>
             <v-form>
                 <v-textarea v-model="ProductDesc" filled label="Add product description" color="cyan">

                 </v-textarea>
                 <v-card-actions>
                     <v-btn dark color="#1F2833" @click="updateDesc">Update</v-btn>
                     <v-btn class="ml-5 cyan"  @click="step = 3">Next</v-btn>
                 </v-card-actions>
             </v-form>
            </v-card-text>
          </v-card>
      </v-stepper-content>

        <v-stepper-content step="3">
          <v-card>
              <v-card-title class="cyan--text">Update Image for Product</v-card-title>
              <v-card-text>
                
               <form @submit.prevent="updateImage">
                 <input ref="selectImage" style="display:none"  type="file" name="ProductImg" @change="onSelect"/>
                  <v-btn small class="mb-5 green" @click="$refs.selectImage.click()"><v-icon>mdi-upload</v-icon>upload</v-btn>
                        
                        <div>
                            <v-img contain :src="Image" max-width="350" max-height="250">

                            </v-img>
                        </div>

                   <div>
                     <v-btn small type="submit" class="mt-5 cyan" >Submit</v-btn>
                   </div>
               </form>
                 
                 

              </v-card-text>
             
                
    
          </v-card>
      </v-stepper-content>
    </v-stepper-items>


  </v-stepper>
 </div>

</div>
</template>

<script>

import axios from 'axios'
//import productImage from './productImage.vue' 
import { mapGetters } from 'vuex'

export default {
    name: 'editProduct',
    components: {
    //   productImage
    },
    data:()=>({
        step: 1,
        Id: '',
        ProductName: '',
        ProductPrice: '',
        ProductQuant: '', 
        ProductDesc: '',
        ProductKeywrds: '',
        ProductImage: '',
        Form_err: '',
        Price_err: '',
        Image: ''
            
    }),

 computed: {
     ...mapGetters(['product','user']),

 },

created(){
 
   if(this.user.data.UserType == 'Product Manager' || this.user.data.UserType == 'Admin'){

   this.Id = this.product.ProductId
   this.ProductName = this.product.ProductName
   this.ProductPrice = this.product.ProductPrice
   this.ProductQuant = this.product.ProductQuant
   this.ProductKeywrds = this.product.ProductKeywrds
   this.ProductDesc = this.product.ProductDesc
   this.ProductImage = this.product.ProductImg
   
   this.Image =  this.ProductImage.substring(2,this.ProductImage.length-2)
   console.log(this.Image)

 }else{
     
     this.$router.push('/')
   
 }

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
                     this.step = 2
                 }
               
               return valid

        },
        updateStep1(){
          // console.log(this.ProductImage)
            axios.put(`http://localhost:8000/products/updateproduct/${this.Id}`,{
            
                ProductName: this.ProductName,
                ProductPrice: this.ProductPrice,
                ProductQuant: this.ProductQuant,
                ProductKeywrds: this.ProductKeywrds,
            }).then(response=>{
                 console.log(response)
                 this.$router.push('/manageproducts')
            }).catch(err=>{
                console.log(err)
            })

        },

        updateDesc(){

            axios.put(`http://localhost:8000/products/updateproduct/${this.Id}`,{
                ProductDesc: this.ProductDesc,
            }).then(response=>{
                console.log(response)
                if(response){
                    this.$router.push('/manageproducts')
                }
            }).catch(err=>{
                 console.log(err)
            })

        },

        onSelect(e){
           
           this.ProductImg = e.target.files[0]
           console.log(this.ProductImg)

        },

        updateImage(){
             
             var formData = new FormData()
             var File = this.ProductImg
         
                 formData.append('ProductImg',File,File.name)
                 axios.put('http://localhost:8000/products/changeimage/'+ this.Id,formData).then(response=>{
                   
                          this.$router.push('/manageproducts')
                          console.log(response)
                    
                 }).catch(err=>{
                     console.log(err)
                 })



        }
    }
}
</script>

<style>

</style>