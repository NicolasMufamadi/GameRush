<template>
    <div>
         <div>
             <h1 class="cyan--text text-center">Add Cuopon</h1>
         </div>

         <div>
             <form action="">
                 <v-text-field 
                          label='Cuopon Name' 
                          color='#1F2833'
                          filled
                          v-model="cuoponName"
                 >

                 </v-text-field>

                 <v-text-field
                        label='Min Amount'
                        color='#1F2833'
                        filled
                        v-model="cuoponMinAmount"

                 >
                 </v-text-field>

                 <v-text-field 
                          label='Amount Off'
                          color='#1F2833'
                          filled
                          v-model="cuoponAmountOff"
                 >

                 </v-text-field>

             </form>
         </div>
         
         <div>
             <h4 class="cyan--text">ExpiresOn</h4>
               <v-row>
                   <v-col>
            
                       <v-sheet height='64'>

                           <v-toolbar flat>

                              <v-icon @click="$refs.calendar.prev()">mdi-chevron-left</v-icon>
                              <v-toolbar-title class="ml-13" v-if="$refs.calendar">
                                   {{$refs.calendar.title}}
                              </v-toolbar-title>
                              <v-icon class="ml-16" @click="$refs.calendar.next()">mdi-chevron-right</v-icon>

                           </v-toolbar>

                       </v-sheet>

                       <v-sheet height='250' width='300'>
                           
                           <v-calendar 
                                   ref="calendar"
                                   :type="type"
                                   @click:date="viewDay"
                                   v-model="focus">

                           </v-calendar>

                       </v-sheet>
                   </v-col>
               </v-row>

               <v-btn class="mt-3" color='cyan' @click="addCuopon">
                    Add
               </v-btn>
         </div>

    </div>    
</template>

<script>

import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
    name: 'AddCuopon',

    data:()=> ({
             
             cuoponName: '',
             cuoponAmountOff: '',
             cuoponMinAmount: '',
             type: 'month',
             focus: '',
             User: ''

    }),

    onchange(){
       
       this.$refs.calendar.checkChange()
       
    },


    computed: {
         ...mapGetters(['user'])
    },

    beforeMount(){
         if(this.user !== null && this.user.data.UserType !== 'Admin') {
              this.User = this.user
         }else{

             this.$router.push('/') 
         }   
         
    },

    mounted(){
        this.focus = this.$refs.calendar._data.times.today.date
    },

    methods: {
     
     viewDay({date}){
            this.focus = date
        },

        addCuopon(){
          
              axios.post('http://localhost:8000/cuopons/addcuopon',{
                  cuoponName: this.cuoponName,
                  cuoponOff: this.cuoponAmountOff,
                  cuoponMinAmount: this.cuoponMinAmount,
                  cuoponExpDate: this.focus
              }).then(response=>{
                  if(response){
                      this.$router.push('/managecuopons')
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