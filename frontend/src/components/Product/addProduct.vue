<template>
    <div>
          <form @submit.prevent="submit">
           
            <div>
             <input value="ProductImage" class="ml-8" type="file" name="ProductImg" @change="onChange"   > 
           </div>
            <v-btn class="mt-5 green" type="submit"> <v-icon>mdi-upload</v-icon>
              Submit
            </v-btn>
          </form>

        <div>
             <v-img contain max-height="300" max-width="300" src="" id="previewImage" >

             </v-img>
        </div>

    </div>
</template>

<script>

import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
    name: 'addProduct',
    props:['ProductName','ProductPrice','ProductQuant','ProductDesc','ProductKeywrds','ProductImage','SubCategory','Category'], 
    data: ()=>({
          ProductImg: '',
          image: '',
          User: '',
    }),

    computed: {
         ...mapGetters(['user'])  
    },

    beforeMount(){
        if(this.user !== null && (this.user.data.UserType == 'Admin'  || this.user.data.UserType == 'Product Manager')) {
               
             this.User = this.user

        } else{
          
          this.$router.push('/')
        } 
          
    },

   methods: {
       
       onChange(e){
           
           this.ProductImg = e.target.files[0]
            console.log(this.ProductImg)
       },


        submit(){

          console.log(this.Category)
        
           var formData = new FormData()
           var File = this.ProductImg
           if(File){
          
           formData.append('ProductImg',File,File.name)
           formData.append('ProductName',this.ProductName)
           formData.append('ProductPrice',this.ProductPrice)
           formData.append('ProductDesc',this.ProductDesc)
           formData.append('ProductKeywrds',this.ProductKeywrds)
           formData.append('ProductQuant',this.ProductQuant)
           formData.append('ProductCategory',this.Category)
           formData.append('ProductSubCategory',this.SubCategory)
              
           }else{
             console.log('Provide no File message')
           }

              axios.post('http://localhost:8000/products/addproduct',formData,{                        
            }).then(response=>{
                 if(response && formData){
                   this.$router.push('/manageproducts')
                 }else{
                   console.log('Nooo')
                 }
            }).catch(err=>{
                console.log('No data'+ err)
            })

        }

    },

}
</script>

<style>
.input:hover{
  cursor: pointer;
}
</style>