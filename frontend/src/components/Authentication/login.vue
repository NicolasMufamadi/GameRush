<template>
<div>

    <v-card>
        <v-card-title class="title">
            <v-icon color="#1F2833">mdi-account</v-icon>
              Login
        </v-card-title>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12" ms="3">
                    <v-text-field
                      v-model="Email"
                      label="Email"
                      type="email"
                      :error="Email_err ? true : false"
                      :error-messages="Email_err"
                      solo
                      hide-details = "auto"
                 
                    >

                    </v-text-field>

                </v-col>

                <v-col cols="12" sm="12" ms="3">
                    <v-text-field
                      v-model="Password"
                      label="Password"
                      type="password"
                      :error="Password_err ? true : false"
                      :error-messages="Password_err"
                      solo
                      hide-details ="auto"
                  
                    >

                    </v-text-field>
 
                    <a v-bind:href="`/forgotpassword`" class="ml-1">Forgot Password?</a>

                </v-col>

            </v-row>
        </v-container>
        <v-card-actions>
            <div class="mx-2" >
          <v-btn color="#66FCF1" @click="OnSubmit">
              Login
              </v-btn>
            </div>
        <div class="mx-2">
         <v-btn v-if="done" @click="reset" color="error">
             Close
         </v-btn>
         </div>
        </v-card-actions>
    </v-card>      
   
 </div>
</template>

<script>

import axios from 'axios'


export default {

   name:"login",
   props:['done'],

   data:()=>({
        Email: '',
        Password: '',
        Email_err: null,
        Password_err: null,

   }),


   methods:{

 
       OnSubmit(e){

         e.preventDefault();
          

          if(!this.validate()) return false


           axios.post("http://localhost:8000/users/login",{

             Email: this.Email,
             Password: this.Password
             
            }).then(response=>{
               
               if(response.data.data.IsBanned == false){

                   localStorage.setItem('token',response.data.token)               
                   this.$store.dispatch('getauth',response.data)
                   this.reset()
                   this.done()
               }else{
                   this.Password_err = "You've been banned"
               }
            }).catch(error=>{
                if(error){

                    this.Password_err = "Password or Email incorrect"
                }
            })
       },

       validate(){
         
           let valid = true 
           if(!this.Email  || !this.Password){
               this.Email_err = "Required",
               this.Password_err = "Required",
               valid = false
           }else{
               this.Email_err = null
               this.Password_err = null
           }
         return valid
       },

       reset(){
            
            this.Email = '';
            this.Email_err = '';
            this.Password = null
            this.Password_err = null
        
           if(this.done) this.done()

       }
   }    
}
</script>

<style>

</style>