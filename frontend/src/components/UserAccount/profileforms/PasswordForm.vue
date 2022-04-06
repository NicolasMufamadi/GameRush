<template>
    <div class="d-flex justify-space-between">
        <div>
            <UserCard />
        </div>

       <div class="container mt-16 ml-5">

           <div>
               <h1>Edit Your Password</h1>
           </div>

           <div>
               <form>
                <div>
                    <v-text-field 
                    
                         label="New Password" 
                         filled color="#1F2833"
                         v-model="NewPassword"
                         :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                         :type="show2 ? 'text' : 'password'"
                         :error="new_password_err ? true : false"
                         :error-messages="new_password_err"
                         hint="At least 8 characters, 1 uppercase,1 lowercase, 1 digit & 1 special character"
                         @click:append="show2 = !show2"
                    
                    >

                    </v-text-field>
                </div>

                <div>
                    <v-text-field  
                    
                        label="Confirm New Password" 
                        filled color="#1F2833"
                        v-model="ConfirmNew"
                        :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show3 ? 'text' : 'password'"
                        :error="confirm_password_err ? true : false"
                        :error-messages="confirm_password_err"
                        @click:append="show3 = !show3"
                        
                    >

                    </v-text-field>
                </div>

                <div  class="d-flex justify-end">
                    <v-btn @click="cancel" class="mx-5" color="error" large outlined>Cancel</v-btn>
                    <v-btn @click="updatePassword" color="#1F2833" large outlined>Update</v-btn>
                </div>

               </form>
           </div>

       </div>

    </div>
</template>

<script>

import UserCard from '../UserCard.vue'
import axios from 'axios'
import {mapGetters} from 'vuex'
import bcrypt from 'bcryptjs'

export default {
   name: "PasswordForm",
   components:{
      UserCard
   },
   
   data:()=>({


       Password: '',
       NewPassword: '',
       ConfirmNew: '',

       show2: false,
       show3: false,

       new_password_err: '',
       confirm_password_err: ''


   }),

   computed:{
        ...mapGetters(['user'],['UserId'])
   },

  beforeMount(){

        axios.post('http://localhost:8000/users/checkauth',this.user,{
          headers:{
            'content-type': 'text/json',
            'Authorization': 'Bearer'+ ' '+ localStorage.getItem('token')
          }
        }).then(()=>{
         
         this.Id = this.user.data.UserId
         this.Password = this.user.data.Password
        }).catch(()=>{
          
            this.$router.push('/')
            this.$store.dispatch('logout')
        })
    
  },

   methods:
   {
          
          async updatePassword(e){
                
                e.preventDefault()

            if(!this.validate()) return false

               await axios.put(`http://localhost:8000/users/updateuser/password/${this.Id}`,
               {

                     Password: this.NewPassword,

               }).then(data=>{
                   
                   this.$store.dispatch('getauth',data)
                   this.$router.push('/myaccount/personal-details/')

               }).catch(err=>{
                   console.log(err)
               })

          },


          validate(){

              let valid = true

              bcrypt.compare(this.CurrentPassword,this.Password,(err,response)=>{
                  if(err){
                
                      this.current_passwor_err = 'Current Password not matching'
                      valid = false
                  }

                  if(response){
                     this.current_passwor_err = null   
                  }
                  
              })

             let PasswordStrength = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})")
              if(!PasswordStrength.test(this.NewPassword)){
          
             this.new_password_err = "At least 8 characters, 1 uppercase,1 lowercase, 1 digit & 1 special character"
              valid = false
          }else{
            this.new_password_err = null
          }
            if( PasswordStrength.test(this.NewPassword) && this.NewPassword !== this.ConfirmNew){
               this.confirm_password_err = "Password does not match"
               valid = false 
        }else{
               this.confirm_password_err = null
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