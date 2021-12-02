<template>
  <v-card>
    <v-card-title>
      <span class="title">
        <v-icon color="#1F2833">mdi-account</v-icon>
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
               color="#1F2833"
               required
               solo
              hide-details>
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="12" ms="1">
            <v-text-field    
                 v-model="LastName"
                 label="Last Name" 
                 color="#1F2833" 
                 solo
                 hide-details>
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" ms="1">
            <v-text-field
              v-model="Email"
              label="Email"
              type="email"
              solo
              hide-details
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" ms="3">
            <v-text-field
              v-model="ConfirmEmail"
              label="Confirm-Email"
              type="email"
              required
              solo
              hide-details
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" sm="6" ms="1">
            <v-text-field
               v-model="Password"
               label="Password"
               type="password"
               solo
               hide-details   
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" ms="1">
            <v-text-field
                v-model="ConfirmPassword"
                label="Confirm-Password"
                type="password"
                required
                solo
                hide-details
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" sm="12" ms="1">
            <v-text-field 
               v-model="Phone"
               label="Phone Number" 
               required 
               solo 
               hide-details
            >
            </v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <div>
     <v-btn @click="submitForm" color="#66FCF1" lighht  depressed class="mx-2">
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
</template>

<script>

import axios from 'axios'

export default {
  name: "register",
   props: ["done"],
   data: ()=>({
      
      FirstName: '',
      LastName: '',
      Email: '',
      ConfirmEmail: '',
      Password: '',
      ConfirmPassword: '',
      Phone: '',
      UserType: 4
    

   }),
   methods: {

    async submitForm(e){

       e.preventDefault();

       let response = await axios.post('http://localhost:8025/users/register',{
            FirstName: this.FirstName,
            LastName: this.LastName,
            Email: this.Email,
            Password: this.Password,
            Phone: this.Phone,
            UserType: this.UserType
         })
           
           if(response){
             this.done()
             this.reset()
           }else{
             console.log('error')
           }
 
     },

     reset(){

        
        this.FirstName = '';
        this.LastName = '';
        this.Email = '';
        this.ConfirmEmail = '';
        this.Password = '';
        this.ConfirmPassword = '';
        this.Phone = '';

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
