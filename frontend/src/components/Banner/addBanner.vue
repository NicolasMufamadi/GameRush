<template>
    <div>
         <div class="cyan--text text-center">
             <h1>Add Banner</h1>
         </div>
         <div>
             <v-form>
                 <v-container>
                     <v-row>
                         <v-col>
                             <v-text-field v-model="title" color="#1F2833" filled label="Title">

                             </v-text-field>
                         </v-col>
                     </v-row>
                     <v-row>
                         <v-col>
                            <v-text-field v-model="link" color="#1F2833" filled label="Link">

                            </v-text-field>
                         </v-col>
                     </v-row>

                     <v-row>
                         <v-col>
                             <input style="display:none" type="file" name="bannerImg" ref="selectImage" @change="onSelected">
                             <v-btn class="cyan" @click="$refs.selectImage.click()"><v-icon>mdi-upload</v-icon>Image</v-btn>
                             <span>{{filename}}</span>
                         </v-col>
                     </v-row>
                    <v-row>
                        <v-col cols="16" sm="6">
                           <v-sheet>
                               <v-toolbar  color= "#1F2833">
                                   <v-btn
                                     text
                                     fab
                                     smal 
                                     color="cyan"
                                     @click="$refs.calendar.prev()"
                                   >
                                    <v-icon small>mdi-chevron-left</v-icon>
                                   </v-btn>
                                <v-toolbar-title class="cyan--text ml-16 mr-16"  v-if="$refs.calendar" ><h4 class="ml-16 mr-11">{{ $refs.calendar.title }}</h4></v-toolbar-title>
                                   <v-btn
                                     fab
                                     text 
                                     small
                                     color="cyan"
                                     @click="$refs.calendar.next()"
                                     class="ml-16"
                                   >
                                       <v-icon small>mdi-chevron-right</v-icon>
                                   </v-btn>

                                
                               </v-toolbar>
                           </v-sheet>
                          
                          <v-sheet height="200">
                               <v-calendar 
                                   :type="type"
                                   v-model="focus"
                                   ref="calendar"
                                   @click:date="viewDay"
                                >
                                   
                               </v-calendar>
                          </v-sheet>

                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-btn class="cyan" @click="addBanner">Add Banner</v-btn>
                        </v-col>
                    </v-row>
                    <strong class="mt-2 red--text">{{handler}}</strong>
                 </v-container>
             </v-form>
         </div>
    </div>
</template>

<script>

import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
    name: 'addBanner',
    data: ()=>({
          
          title: '',
          link: '',
          focus: '',
          obj: {},
          filename: '',
          handler: '',
          type: 'month',
          bannerImage: '',
          bannerArr: [
              {

              }
          ],
          User: '',

    }),

    computed:{
        ...mapGetters(['user'])
    },

    beforeMount(){
         if(this.user !== null && this.user.data.UserType == 'Admin') {
             this.User = this.user   
         } else{

             this.$router.push('/') 
         }
    },

    mounted(){
       
       this.$refs.calendar.checkChange()
       this.focus = this.$refs.calendar._data.times.today.date
       
       
    },

    methods: {
          
          viewDay({date}){
              
              this.focus = date
              console.log(this.focus)
             
          },

          onSelected(e){
              this.bannerImage = e.target.files[0]
              this.filename = this.bannerImage.name
              console.log(this.filename)
          },

          addBanner(){
               
               var fd = new FormData()
            
            if(this.bannerImage){

              fd.append('bannerImg',this.bannerImage,this.bannerImage.name)
              fd.append('bannerName',this.title)
              fd.append('bannerLink',this.link)
              fd.append('expDate',this.focus)

              axios.post('http://localhost:8000/banners/addbanner',fd).then(response=>{
                  console.log(response)
                  this.$router.push('/managebanners')
              }).catch(err=>{
                  console.log(err)
              })
           }else{
               this.handler = 'please provide all information'
           }

          }

    }
}
</script>

<style>

</style>