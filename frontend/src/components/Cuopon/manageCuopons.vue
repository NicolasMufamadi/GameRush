<template>
   <div>
       <div class="cyan--text">
           <h1>Manage Cuopons</h1>
       </div>
       <div>
           <v-btn color="cyan" to='/addcuopon'><v-icon>mdi-plus</v-icon>
               Cuopon
            </v-btn>
       </div>
       <div class="mt-3">
           <v-text-field 
                   color='#1F2833' 
                   filled 
                   label="Search Cuopon"
                   v-model="search">

           </v-text-field>
       </div>

       <div>
           <v-data-table :headers='headers' :items='cuopons' :search='search'>
               <template v-slot:[`item.action`]="{ item }">
                   <v-icon  color='red' small @click="getCuoponToDelete(item)">mdi-delete</v-icon>
                   <v-icon color='cyan' small class="ml-3" @click="getCuoponToEditCuopon(item)">mdi-pencil</v-icon>
               </template>
           </v-data-table>
       </div>
       <v-dialog
          max-width= '500px'
          transition='dialog-bottom-transition'
          v-model="removeCuoponDialog"
       >
       <removeCuopon :Item='Item' :closeRemoveCuoponDialog='closeRemoveCuoponDialog'/>
       </v-dialog>

       <v-dialog
           max-width='750px'
           transition='dialog-top-transition'
           v-model="editCuoponDialog"
       >
        <editCuopon :Item="Item" :closeEditCuoponDialog="closeEditCuoponDialog" />
       </v-dialog>
   </div>
</template>

<script>

import axios from 'axios'
import removeCuopon from './removeCuopon.vue'
import editCuopon from './editCuopon.vue'

export default {
  
  name: "manageCuopons",
  components: {
     removeCuopon,
     editCuopon
  },
  data: () => ({
         
         search: '',
         Item: '',
         removeCuoponDialog: false,
         editCuoponDialog: false,
         cuopons: [],
         headers: [
             {
                  text: 'CuoponName',
                  align: 'start',
                  sortable: false,
                  value: 'cuoponName'
             },

             {
                 text: 'CuoponAmountOff',
                 filterable: false,
                 value: 'cuoponOff' 
             },

             {
                 text: 'CuoponMinAmount',
                 filterable: 'false',
                 value: 'cuoponMinAmount'
             },

             {
                 text: 'ExpiresOn',
                 filterable: false,
                 value: 'cuoponExpDate'
             },

             {
                 text: 'Actions',
                 sortable: false,
                 value: 'action'
             }
         ],


  }),
  
  
  created(){
       
       axios.get('http://localhost:8000/cuopons/getcuopons')
       .then(response=>{
           this.cuopons = response.data
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
     
     getCuoponToDelete(item){
        
        this.removeCuoponDialog = true
        this.Item = item 
        
     },

     getCuoponToEditCuopon(item){
           
          this.editCuoponDialog = true
          this.Item = item 
             
     },

     closeRemoveCuoponDialog(){
         this.removeCuoponDialog = false
     },

     closeEditCuoponDialog(){
         this.editCuoponDialog = false
     }

  }

}
</script>

<style>

</style>