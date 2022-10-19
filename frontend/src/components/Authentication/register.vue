<template>
<div>

  <v-card>
    <v-card-title>
      <span class="title">
        <v-icon color='cyan'>mdi-account</v-icon>
        Register
      </span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="12" ms="1">
            <v-text-field
               v-model="FirstName" 
               label="First Name"
                  :error="FirstName_err ? true : false"
                 :error-messages="FirstName_err"
               color="#1F2833"
               solo
               hide-details = "auto"
              >
            </v-text-field>

          </v-col>
          <v-col cols="12" sm="12" ms="1">
            <v-text-field    
                 v-model="LastName"
                 label="Last Name" 
                 :error="LastName_err ? true : false"
                 :error-messages="LastName_err"
                 color="#1F2833" 
                 solo
                 hide-details="auto"
                 >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" ms="1">
            <v-text-field
              v-model="Email"
              label="Email"
              type="email"
              :error="Email_err ? true : false"
              :error-messages ="Email_err"
              solo
              hide-details = "auto"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" ms="3">
            <v-text-field
              v-model="ConfirmEmail"
              label="Confirm-Email"
              type="email"
              :error="ConfirmEmail_err ? true : false"
              :error-messages="ConfirmEmail_err"
              solo
              hide-details = "auto"
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" sm="6" ms="1">
            <v-text-field
               v-model="Password"
               label="Password"
               type="password"
               :error="Password_err ? true : false"
               :error-messages="Password_err"
               solo
               hide-details  = "auto"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" ms="1">
            <v-text-field
                v-model="ConfirmPassword"
                label="Confirm-Password"
                :error="ConfirmPassword_err ? true : false"
                :error-messages="ConfirmPassword_err"
                type="password"
                solo
                hide-details = "auto"
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" sm="12" ms="1">
            <v-text-field 
               v-model="Phone"
               label="Phone Number" 
               :error="Phone_err ? true : false"
               :error-messages="Phone_err"
               solo 
               hide-details = "auto"
            >
            </v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <div>
     <v-btn @click="submitForm" 
            color="#66FCF1" 
            lighht 
            depressed
            class="mx-2"
             >
         Register
     </v-btn>
      </div>
      <div>
        
        <v-btn  v-if="done" @click="reset" color="error" depressed light class="mx-2">
           Close
        </v-btn>
      </div>
    </v-card-actions>
   </v-card>

   <v-dialog
      v-model="loader"
      persistent
      width = "400px"
      transition="dialog-transition"
   >
    <Loader :interval='interval'/>
   </v-dialog>

</div>

</template>

<script>
import axios from 'axios'
import Validator from 'validator'
import Loader from '../Loader/loader.vue'

export default {

  name: "register",
   
   props: ["done"],
   
   components: {
      
      Loader

   },

   data: ()=>({
      FirstName: '',
      LastName: '',
      Email: '',
      ConfirmEmail: '',
      Password: '',
      ConfirmPassword: '',
      Phone: '',
      FirstName_err: null,
      LastName_err: null,
      Email_err: null,
      ConfirmEmail_err: null,
      ConfirmPassword_err: null,
      Password_err: null,
      Phone_err: null,
      loader: false,
      interval: {},
 
  
    
   }),




   methods: {
   submitForm(e){
       e.preventDefault()
        
        
     if(!this.validateInput()) return false
   
            axios.post('http://localhost:8000/users/register',{
              FirstName: this.FirstName,
              LastName: this.LastName,
              Email: this.Email,
              Password: this.Password,
              Phone: this.Phone,
              UserType: this.UserType
           }).then(response=>{
            
            if(response){

                  this.loader = true
                  this.interval = setTimeout(()=>(this.loader = false),10000)
                  this.reset()
                  this.done()
               }
             })
           .catch(error=>{
             
            if(error){
              this.Email_err = "Email already exists"
            }
        
             
             })
         },
     validateInput(){
      
        let valid = true
       
         if(this.FirstName.length < 3){
             this.FirstName_err = "FirstName must have at least 3 characters"
             valid = false
         }  else{
           this.FirstName_err = null
         }
        if(this.LastName.length < 3 ){
          this.LastName_err = "LastName must have at least 3 characters"
           valid = false
        }else{
          this.LastName_err = null
        } 
        if(!Validator.isEmail(this.Email)){
           this.Email_err = "Invalid Email"
            valid = false
        }else{
          this.Email_err = null
        }
        if( Validator.isEmail(this.Email) && this.Email !== this.ConfirmEmail){
           this.ConfirmEmail_err = "Email does not match"
            valid = false 
        }else{
          this.ConfirmEmail_err = null
        }           
        let PasswordStrength = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})")
        if(!PasswordStrength.test(this.Password)){
          
          this.Password_err = "At least 8 characters, 1 uppercase,1 lowercase, 1 digit & 1 special character"
          valid = false
        }else{
          this.Password_err = null
        }
        if( PasswordStrength.test(this.Password) && this.Password !== this.ConfirmPassword){
          this.ConfirmPassword_err = "Password does not match"
          valid = false 
        }else{
          this.ConfirmPassword_err = null
        }
           
         if(!this.ValidateNumber(this.Phone) || this.Phone.length > 12){
             this.Phone_err = "Invalid Number"
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
     
     reset(){
             
        this.FirstName = '';
        this.LastName = '';
        this.Email = '';
        this.ConfirmEmail = '';
        this.Password = '';
        this.ConfirmPassword = '';
        this.Phone = '';
        
        this.FirstName_err = null
        this.LastName_err = null
        this.Email_err = null
        this.ConfirmEmail_err = null
        this.Password_err = null
        this.ConfirmPassword_err = null
        this.Phone_err = null
        
       if(this.done) this.done();
     }
   }
};
</script>

<style>
.title {
  color: "#1F2833";
}
</style>