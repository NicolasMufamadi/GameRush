<template>
    <div>
        <div class="cyan--text">
            <h1>Manage Products</h1>
        </div>
         <div class="my-3">
             <v-btn  color="cyan" @click="$router.push('/addproduct')"><v-icon>mdi-plus</v-icon>Product</v-btn>
         </div>
        <div>
            <v-text-field v-model="search" label="Search Product..." color="#1F2833"></v-text-field>
        </div>
        <div class="d-flex">
           <sortProduct />
           <v-divider class="mx-2 white" vertical color="grey"></v-divider>
           <filterProduct />
        </div>

        <div class="mt-5">
            <v-data-table :headers="headers" :items="products" :search="search">
                <template  v-slot:[`item.action`]="{ item }" >
                  <v-menu offset-y>
                      <template v-slot:activator="{on,attrs }">
                      <v-btn icon @click="editItem(item)"><v-icon color='cyan' small>mdi-pencil</v-icon></v-btn>
                      <v-btn icon @click="deleteItem(item)" ><v-icon color='red' small>mdi-delete</v-icon></v-btn>
                      <v-btn  icon v-on="on" v-bind="attrs" >
                         <v-icon small class="mr-2" >mdi-dots-vertical</v-icon>
                      </v-btn>
                      </template>
                      <v-list>

                          <v-list-item @click="removeProductDialog=true">
                              <v-list-item-title><v-icon  small>mdi-delete</v-icon>Remove</v-list-item-title>
                          </v-list-item>
                      </v-list>
                  </v-menu>
                </template>
            </v-data-table>
        </div>

        <v-dialog v-model="removeProductDialog" transition="dialog-top-transition" persistent max-width="350">
            <removeProduct :close="closeDialog" :Id="Id"/>  
        </v-dialog>

    </div>
</template>

<script>

import axios from 'axios'
import removeProduct from '../../Product/removeProduct.vue'
import { mapGetters } from 'vuex'
import sortProduct from '../../Product/sortProducts.vue'
import filterProduct from '../../Product/filterProducts.vue'

export default {
name: 'ManageProducts',
data:()=>({

    products: [],
    search: '',
    Id: '',
    data: '',
    removeProductDialog: false,
    editDialog: false
    
}),

components: {
    removeProduct,
    sortProduct,
    filterProduct
},

computed:{

         ...mapGetters(['user']),

         headers(){

         return [
         {
             text: 'Name',
             align: 'start',
             value: 'ProductName'
         },

         {
             text: 'Price (R)',
             value:'ProductPrice'
         },

         {
             text: 'Quantity',
             value: 'ProductQuant'
         },

         {
             text: 'Sold',
             value: 'ProductSold'
         },

         {
             text: 'Ratings',
             value: 'ProductRatings'
         },

         {
            text: 'Status',
            value: 'ProductStatus'
         },

         {
             text: 'Action',
             filterable: false,
             value: 'action'
         }

     ]
   }
},

created(){

   if(this.user !== null && (this.user.data.UserType == 'Product Manager' || this.user.data.UserType == 'Admin')){

       axios.get('http://localhost:8000/products/getproducts').then(data=>{
           if(data){
               this.products = data.data
       }
     }).catch(err=>{
         console.log(err)
     })
 }else{
     this.$router.push('/')
 }

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

methods:{
    deleteItem(item){
    
        this.Id = item.ProductId
       console.log(this.Id)
       this.removeProductDialog = true
       
    },

    editItem(item){

       this.$router.push('/editproduct')
       this.$store.dispatch('getproduct',item)

    },
   closeDialog(){

      this.removeProductDialog = false

   }
}

}
</script>

<style>

</style>