<template>
    <div class="d-flex justify-space-between">
        <div class="mt-16">
            <UserCard />
        </div>

        <div class="container mt-16 ml-5 pt-16">

            <div>
                <h1>Edit Your Email</h1>
            </div>

            <div class="mb-3">
                <h3>Current Email: <span>{{ user ? user.data.Email : null}}</span></h3>
            </div>
            
            <form >

            <div>
                <v-text-field
                  label="New Email"
                  filled color="#1F2833"
                  v-model="Email"
                  :error="email_err ? true : false"
                  :error-messages="email_err"  
                >

                </v-text-field>
            </div>

            <div>
                <v-text-field 
                  label="Confirm-Email"
                  filled color="#1F2833"
                  v-model="Confirm_Email"
                  :error="confirm_email_err ? true : false"
                  :error-messages="confirm_email_err"    
                >

                </v-text-field>
            </div>

            <div class="d-flex justify-end">
                                
               <v-btn @click="cancel" class="mx-5" color="error" large outlined >Cancel</v-btn>
               <v-btn @click="updateEmail" color="#1F2833" large outlined>Update</v-btn>

            </div>

        </form>

    </div>
  </div>
</template>

<script>

import UserCard from '../UserCard.vue'
import {mapGetters} from 'vuex'
import axios from 'axios'
import Validator from 'validator'

export default {

   name: "EmailForm",
   components:
    {           
        UserCard
    },

    data:()=>({

        Id: '',
        Email: '',
        Confirm_Email: '',
        email_err: '',
        confirm_email_err: ''

    }),

    computed:
    {
        ...mapGetters(['user'])
    },

          beforeMount(){

        axios.post('http://localhost:8000/users/checkauth',this.user,{
          headers:{
            'content-type': 'text/json',
            'Authorization': 'Bearer'+ ' '+ localStorage.getItem('token')
          }
        }).then(()=>{

         this.Id = this.user.data.UserId
         this.Email = this.user.data.Email
        }).catch(()=>{
          
            this.$router.push('/')
            this.$store.dispatch('logout')
        })
    
  },

    methods:
 {

        async updateEmail(){
            
            if(!this.validate()) return false

        await axios.put(`http://localhost:8000/users/updateuser/email/${this.Id}`,
        {

          Email: this.Email,

        }).then(data=>{
            
         this.$store.dispatch('getauth',data)       
         this.$router.push('/myaccount/personal-details/')
          
        }).catch(err=>{
           if(err){
               this.email_err = 'Email aready exist'
           }
        })


     },

     validate(){

         let valid = true
      if(!Validator.isEmail(this.Email)){
            this.email_err = "Invalid Email"
            valid = false
        
        }else if(Validator.isEmail(this.Email) && this.Email !== this.Confirm_Email){
          this.confirm_email_err = 'Email does not match'
          valid = false 

        }
        
        else{
        
             
             this.confirm_email_err = null
             this.email_err = null
        
           }


        return valid 

     },

     cancel(){
           
           this.$router.push('/myaccount/personal-details/')

     }

 }

}
</script>

<style>

</style>