<template>
  <div class="card">
    <userCard />
    <div class="container mt-14 ml-4">
      <h1 class="cyan--text">Address Book</h1>
      <v-card>
        <div class="d-flex justify-space-between">
          <v-card-title>Delivery Addresses</v-card-title>
          <v-btn class="mt-5 mr-5" color="cyan" to='/myaccount/address-book/add'>
            Add Address
          </v-btn>
        </div>
 
            <v-list three line  >
                 <v-list-item-group v-model="selectedItem" dense  dark >
                      
                   <v-list-item class="item" v-for="address in addresses" :key="address.AdressId"> 
                      <template  v-slot:default = "{ active }">
                       <v-list-item-icon class="my-auto">
                         <v-icon >mdi-circle-outline</v-icon>
                       </v-list-item-icon>
                    
                       <v-list-item-content>

                         <div>
                             <div class="d-inline ml-15 ">
                               <v-chip v-if="active" small class="ml-5" color='teal'>{{address.AdressType}}</v-chip>
                               <v-chip v-else small class="ml-5" color='white' light>{{address.AdressType}}</v-chip>
                             </div>
                            <div class="d-inline ">
                             <v-list-item-title class="font-weight-black" v-text="address.RecipientName"></v-list-item-title> 
                            </div>
                         </div>

                          <v-list-item-subtitle v-if="address.GeographicalFeature && !active" v-text="address.GeographicalFeature"></v-list-item-subtitle>
                          <v-list-item-subtitle v-else class="black--text"  v-text="address.GeographicalFeature"></v-list-item-subtitle>

                          <v-list-item-subtitle v-if="!active" v-text="address.City"></v-list-item-subtitle>
                          <v-list-item-subtitle v-else class="black--text" v-text="address.City"></v-list-item-subtitle>

                          <v-list-item-subtitle v-if="!active" >{{address.StreetAdress}}, {{address.Suburb}}, {{address.PostalCode}} </v-list-item-subtitle>
                          <v-list-item-subtitle v-else class="black--text">{{address.StreetAdress}}, {{address.Suburb}}, {{address.PostalCode}}</v-list-item-subtitle>  

                          <span class="mt-2">{{address.RecipientMobile}}</span>
                       </v-list-item-content>
                     
                        <v-btn icon v-if="active" @click="popDeleteDialog(address.AdressId)" ><v-icon>mdi-delete</v-icon></v-btn>
                        <v-btn icon v-if="active" @click="editAddressDetails(address)" ><v-icon>mdi-pencil</v-icon></v-btn>
                        
                      </template>
                   </v-list-item>

                 </v-list-item-group>
            </v-list>

  </v-card>
 </div>

 <v-dialog persistent transition='dialog-top-transition' width='500' v-model="removeAddressDialog">
  <removeAddress :cancelDialog='cancelDialog' :deleteAddress='deleteAddress'/>
 </v-dialog>

</div>
</template>

<script>

import userCard from "./UserCard.vue";
import removeAddress from './removeAddress.vue'
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  name: "AddressBook",
  components: {
    userCard,
    removeAddress
  },

  data: ()=>({
       addresses: '',
       selectedItem: '',
       removeAddressDialog: false,
       addressId: '' 
  }),

  computed: {
        ...mapGetters(['user'])
  },

  
  created(){
        
        if(this.user !== null){   

             axios.get('http://localhost:8000/address/getaddresses',{params: {UserId: this.user.data.UserId}})
             .then(response=>{
                if(response){
                   
                   this.addresses = response.data
                    console.log(this.addresses)
                }
             }).catch(err=>{
               if(err){
                 console.log(err)
               }
             })
             
        }else{
            this.$router.push('/')
        }
        
  },

  methods: {

      popDeleteDialog(Id){
             
             this.removeAddressDialog = true 
             this.addressId = Id 
            
          
      },

      cancelDialog(){
            
           return this.removeAddressDialog = false
          
      },


      deleteAddress(){
              
          axios.delete(`http://localhost:8000/address/removeaddress/${this.addressId}`)
          .then(response=>{
            if(response){
              this.removeAddressDialog = false 
              this.$router.go('')
            }
          }).catch(err=>{
            if(err){
               console.log(err)
            }
          })    
          
      },


      editAddressDetails(address){
               
         this.$store.dispatch('getAddress',address)
         this.$router.push('/myaccount/edit-address-details')
          
      }
      
  }

};
</script>

<style>

.item{
  background-color: rgb(15, 153, 153);
  margin: 1rem;
};



</style>