<template>
    <div class="d-flex justify-space-between">
        <div>
            <UserCard/>
        </div>

        <div class="container mt-16 ml-5">

            <div>
                <h1>Edit Your Numbers</h1>
            </div>

            <div>
                <form >
                    <div>
                         <v-text-field 
                                 v-model="Phone" 
                                 label="Change Numbers" 
                                 filled color="#1F2833"
                                 :error="Phone_err ? true : false"
                                 :error-messages="Phone_err"       
                         >

                         </v-text-field>
                    </div>
                 <div  class="d-flex justify-end">
                    <v-btn @click="cancel" class="mx-5" color="error" large outlined>Cancel</v-btn>
                    <v-btn @click="updateNumbers" color="#1F2833" large outlined>Update</v-btn>
                </div>
                </form>
            </div>

        </div>
    </div>    
</template>

<script>

import UserCard from '../UserCard.vue'
import {mapGetters} from 'vuex'
import axios from 'axios'

export default {
    name: "PhoneForm",
    components: {
        UserCard
    },
    
    data:()=>({
         
        Id: '',
        Phone: '',

        Phone_err: ''

    }),

    computed:
    {
        ...mapGetters(['user'])         
    },

     created(){

         this.Id = this.user.data.UserId
         this.Phone = this.user.data.Phone

       },

    methods:
    {
          async updateNumbers(e){
               
               e.preventDefault()

              if(!this.validate()) return false

              await axios.put(`http://localhost:8000/users/updateuser/phone/${this.Id}`,
              {

                 Phone: this.Phone

              }).then(data=>{
                      this.$store.dispatch('getauth',data)
                      this.$router.push('/myaccount/personal-details/')
       
              }).catch(err=>{
                  console.log(err)
              })
          },

      validate(){
 
           let valid = true
        if(!this.ValidateNumber(this.Phone) || this.Phone.length > 12){
             this.Phone_err = "Enter valid RSA Number"
             valid = false
         }else{
           this.Phone_err = null
         }
          
          return valid       
     },


      ValidateNumber(number){
         let phonReg = new RegExp("[0|+27]{1}[0-9]{9,}")
         return phonReg.test(number);
     },

      cancel(){
          this.$router.push('/myaccount/personal-details/')
      }

    }
}
</script>

<style>

</style>