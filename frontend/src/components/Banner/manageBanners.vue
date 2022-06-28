<template>
    <div>
        <div class="cyan--text">
            <h1>Manage Banners</h1>
        </div>
        <div class="mt-3">
            <v-btn class="cyan" to='/addbanner'>
              <v-icon>mdi-plus</v-icon>  Add Banner
            </v-btn>
        </div>
        <div class="mt-3">
           <v-simple-table>
               <template v-slot:default >
                   <thead>
                       <tr>
                          <th class="text-left">Image</th>
                          <th class="text-left">Title</th>
                          <th class="text-left">Link</th>
                          <th class="text-left">Remove On</th>
                         
                          <th class="text-left">Action</th>
                         
                       </tr>

                   </thead>

                   <tbody>
                       <tr
                           v-for="banner in banners"
                           :key="banner.bannerId"
                       >

                       <td>
                           <v-img 
                                 contain 
                                 :src="banner.bannerImg" 
                                  max-width="100" 
                                  max-height="75">
                            </v-img>
                       </td>

                       <td>{{banner.bannerName}}</td>
                       <td>{{banner.bannerLink}}</td>
                       <td>{{banner.expDate}}</td>
                       <td>
                           <v-btn  icon><v-icon color="red" @click="removeBanner(banner)">mdi-delete</v-icon></v-btn>
                           <v-btn icon><v-icon color="cyan" @click="editBanner(banner)">mdi-pencil</v-icon></v-btn>
                       </td>

                       </tr>
                   </tbody>
               </template>
           </v-simple-table>
        </div>
        <v-dialog
                 
                 persistent
                 max-width="400px" 
                 tansition="dialog-bottom-transition"
                 v-model="removeBannerDialog">

            <deleteBanner :removeDialog="closeDialog" :banner="getbanner"/>
        </v-dialog>

        <v-dialog 
              fullscreen
              transition="dialog-top-transition"
              v-model="editBannerDialog"      
        >

        <editBanner :close="closeEditBannerDialog" :banner="getbanner"/>
       
        </v-dialog>
    </div>
</template>

<script>

import axios from 'axios'
import deleteBanner from './deleteBanner.vue'
import editBanner from './editBanner.vue'
import { mapGetters } from 'vuex'

export default {
     name: 'manageBanner',
     components:{
        
        deleteBanner,
        editBanner,

     },

     data:()=>({
           
           banners: [],
           images: [],
           imageLink: '',
           getbanner: '',
           removeBannerDialog: false,
           editBannerDialog: false,
           headers: [
               {
                     text: 'Image',
                     align: 'start',
                     sortable: false,
                     value: 'bannerImage'
               },

               {
                   text: 'Title',
                   sortable: false,
                   value: 'bannerName'
               },

               {
                   text: 'Link',
                   sortable: false,
                   value: 'bannerLink'
               },

               {
                   text: 'Removal Date',
                   sortable: false,
                   value: 'expDate'
               }
           ]

     }),

  computed:{
          ...mapGetters(['user'])
 },
     
created(){
       
       if( this.user !== null && this.user.data.UserType =='Admin'){

           axios.get('http://localhost:8000/banners/getbanners').then(response=>{
               
               console.log(response)
            if(response){
                this.banners = response.data
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


  methods: {
      removeBanner(banner){
         this.removeBannerDialog = true
         this.getbanner = banner 
        
      },

      closeDialog(){
          this.removeBannerDialog = false
      },

      editBanner(banner){
          
          this.editBannerDialog = true
          this.getbanner = banner
    
      },

      closeEditBannerDialog(){
          this.editBannerDialog = false
      }


  }

}
</script>

<style>

</style>