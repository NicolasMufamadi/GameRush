<template>
    <div>
        
        <v-container fluid>
            <v-row dense>
               <v-col
                  
                   v-for="product in products"
                   :key="product.ProductId"
                   :cols='3'
               >


            <v-card 
                  color='#1F2833' 
                  height="300"
                  
                  @click="viewProduct(product)"
            >


                  <v-img
                       
                       contain
                       :src='product.ProductImg'
                       height='200'
                  >

                  </v-img>

                 <div class="cyan--text text-center">
                     
                     <h4>{{product.ProductName}}</h4>

                 </div>

                 <div class="ml-2 cyan--text">
                     <h4>R {{product.ProductPrice}}</h4>
                     <h4>{{product.ProductStatus}}</h4>
                     <h6><v-icon x-small color='yellow'>mdi-star</v-icon>{{'('+product.ProductRatings+')'}}</h6>
                 </div>

                  

            </v-card>

               </v-col>
            </v-row>

        </v-container>
    </div>
</template>

<script>

//import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
    name: 'viewProducts',
    data: ()=>({
        
          productImg: '',
          ImgSrc: ''

    }),
    

    computed: {
        ...mapGetters(['products'])
    },

    created(){
        
        this.$store.dispatch('getProducts')

    },

    methods: {
         
         viewProduct(product){
             this.$store.dispatch('getproduct',product)
             this.$router.push('/viewproduct')
         }
         
    }
}
</script>

<style scoped>

</style>