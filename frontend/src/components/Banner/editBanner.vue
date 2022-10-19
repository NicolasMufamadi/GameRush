<template>
    <div>
         
         <v-card>
             <v-toolbar dark color="#1F2833">
                  <v-btn icon><v-icon color="cyan" @click="closeDialog">mdi-close</v-icon></v-btn>
                  <v-toolbar-title class="cyan--text">Edit Banner</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                      <v-btn dark text color="cyan" @click="saveChanges">
                          Save
                      </v-btn>
                  </v-toolbar-items>
             </v-toolbar>
             <div>
                 <form action="">
                     <div class="mt-10">
                         <v-text-field 
                               filled 
                               label="Title"
                               color="#1F2833"
                               v-model="Title">
                         </v-text-field>
                     </div>
                     <div>
                         <v-text-field 
                             filled 
                             label="Link" 
                             color="#1F2833"
                             v-model="Link">
                         </v-text-field>
                     </div>
                    
                    <div>
                        <v-text-field 
                              filled 
                              label="Remove on" 
                              color="#1F2833"
                              v-model="RemoveOn">

                        </v-text-field>
                    </div>
                    
                 </form>
                  
              <changeBannerImg :image="image" :Id="Id"/> 

             </div>
         </v-card>

    </div>
</template>

<script>

import axios from 'axios'
import changeBannerImg from './changeBannerImg.vue'

export default {
    name: 'editBanner',
    props: ['close','banner'],
    components:{
        changeBannerImg
    },
    data: ()=>({
       
       Id: '',
       Title: '',
       Link: '',
       RemoveOn: '',
       image: '',
       bannerImage: '',
       bannerImg: ''

    }),

    created(){
         
         this.Id = this.banner.bannerId
         this.Title = this.banner.bannerName
         this.Link = this.banner.bannerLink
         this.RemoveOn = this.banner.expDate
         this.bannerImg = this.banner.bannerImg
         
         this.image = this.bannerImg
         console.log(this.Id)


    },

    methods: {
        
        closeDialog(){
            this.close()
            this.$router.go('/managebanners')
        },

        saveChanges(){
   
            axios.put('http://localhost:8000/banners/updatebanner/'+this.Id,{
                bannerName: this.Title,
                bannerLink: this.Link,
                expDate: this.RemoveOn
            }).then(response=>{
                if(response){
                    this.$router.go('')
                }
            }).catch(err=>{
                console.log(err)
            })

        }

    }

}
</script>

<style>

</style>