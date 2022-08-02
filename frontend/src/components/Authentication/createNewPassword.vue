<template>
    <div>
        <h1 class="cyan--text">Create new Password</h1>

        <v-row v-if="userExist == false">
            <v-col>
                <p class="text-center">Enter your email address to verify your account </p>
            </v-col>
            <v-col cols="12" sm="12">
                <v-text-field v-model="email" label="Email" :error="email_err ? true : false"
                    :error-messages="email_err" filled color="cyan">

                </v-text-field>
            </v-col>

            <v-col>

                <v-btn class="cyan" @click="verify">
                    Verify
                </v-btn>
            </v-col>

        </v-row>

        <v-row v-else>
            <v-col>
                <p class="text-center">Enter Your new password</p>
            </v-col>
            <v-col cols="12">
                <v-text-field v-model="newPassword" label="New Password" :error="password_err ? true : false"
                    :error-messages="password_err" color="cyan" type="password" filled>

                </v-text-field>
            </v-col>

            <v-col cols="12">
                <v-text-field v-model="confirmNewPassword" label="Confirm New Password"
                    :error="confirmPassword_err ? true : false" :error-messages="confirmPassword_err" color="cyan"
                    filled type="password">

                </v-text-field>
            </v-col>

            <v-col>
                <v-btn color="cyan" @click="submit">Submit</v-btn>
            </v-col>
        </v-row>
    
    <v-dialog
          v-model="loader"
          width="300"
          transition="dialog-top-transition"
          persistent 
          hide-overlay
    >
     <loading />
    </v-dialog>

    </div>
</template>

<script>

import axios from 'axios'
import loading from '../Loader/linearProgress.vue'

export default {
   
    name: "createNewPassword",
    
    components: {
      loading 
    },

    data: () => ({
        user: null,
        Id: "",
        userExist: false,
        newPassword: "",
        confirmNewPassword: "",
        email: "",
        email_err: "",
        password_err: "",
        confirmPassword_err: "",
        loader: false 
    }),

    watch: {
       loader (val){
        if(!val) return 
              setTimeout(() => (this.loader = false), 4000)
       }
    },

    methods: {
       
       async verify() {
            if (!this.validate())
                return false;
            this.user = await axios.get("http://localhost:8000/users/getbyemail/", { params: { Email: this.email } });
            console.log(this.user.data);
            if (this.user.data == "") {
                this.email_err = "User of this email does not exist";
                this.userExist = false;
            }
            else {
                this.Id = this.user.data.UserId;
                this.userExist = true;
            }
        },

        submit() {
            if (!this.validate())
                return false;
            axios.put("http://localhost:8000/users/updateuser/password/" + this.Id, { Password: this.newPassword })
            .then(() => {
               this.loader = true 
               this.newPassword = ''
               this.confirmNewPassword = ''
            });
        },

        validate() {
            let valid = true;
            if (this.email == "") {
                this.email_err = "Please enter you email address";
                valid = false;
            }
            else {
                this.email_err = null;
            }
            if (this.userExist == true) {
                if (this.confirmNewPassword == "") {
                    this.confirmPassword_err = "Please enter your confirm new password";
                    valid = false;
                }
                else {
                    this.confirmPassword_err = null;
                }
                let PasswordStrength = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})");
                if (!PasswordStrength.test(this.newPassword)) {
                    this.password_err = "At least 8 characters, 1 uppercase,1 lowercase, 1 digit & 1 special character";
                    valid = false;
                }
                else {
                    this.password_err = null;
                }
                if (PasswordStrength.test(this.newPassword) && this.newPassword !== this.confirmNewPassword) {
                    this.confirmPassword_err = "Confirm new Password does not match with the new password";
                    valid = false;
                }
                else if (this.confirmNewPassword == "") {
                    this.confirmPassword_err = "Please enter your confirm new password";
                    this.valid = false;
                }
                else {
                    this.confirmPassword_err = null;
                }
            }
            return valid;
        },

    },
}
</script>

