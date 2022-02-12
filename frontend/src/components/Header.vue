<template>
 <div>
<v-app-bar 
      color= "#1F2833"
      app
      dark  
     
  >


<v-toolbar
   flat
    dense
    color= "#1F2833"
   >
 <v-toolbar-title
       class="tittle"
 >
   GameRush
 </v-toolbar-title>  
<v-spacer></v-spacer>

<v-toolbar-items>
    <v-form>
     <v-text-field
     placeholder="Fifa 19"   
      outlined
      single-line
      hide-details
      background-color="#1F2833"
      label="Search"
      dense
      append-icon="mdi-magnify"
      dark
      solo
      clearable
      color="#66FCF1">
     </v-text-field>
    </v-form>    
  <div>
     <v-btn 
           outlined  
           light 
           depressed 
           color="#66FCF1" 
           class='mx-3'>
          <v-icon>mdi-gamepad</v-icon>
           Games
     </v-btn>
     <v-menu offset-y>
     <template v-slot:activator="{on,attrs}">
    <v-btn
           outlined
           light
           v-bind="attrs"
           v-on="on"
           depressed
           color="#66FCF1"
           class="mx-3"
    >
    <v-icon>mdi-account</v-icon>
         My Account
           </v-btn>
        </template>
        <v-list>
           <v-list-item @click="registerDialog=true"   v-if="!user">
             <v-list-item-title>
               <v-icon>mdi-account-plus</v-icon>
               Register
             </v-list-item-title>
             </v-list-item>

             <v-list-item v-if="user">
              <v-list-item-title>
               <v-icon>mdi-account</v-icon>
               MyAccount
             </v-list-item-title>
           </v-list-item>

            <v-list-item @click="loginDialog=true" v-if="!user">
             <v-list-item-title>
               <v-icon>mdi-account-arrow-up</v-icon>
               Login
             </v-list-item-title>

           </v-list-item>
           <v-list-item v-if="user">
            <v-list-item-title>
            <v-icon>mdi-archive</v-icon>
                MyOrders
            </v-list-item-title>
           </v-list-item>

           <v-list-item @click="logout" v-if="user">
             <v-list-item-title><v-icon>mdi-account-arrow-down</v-icon>Logout</v-list-item-title>
           </v-list-item>
        </v-list>
       </v-menu>
     <v-btn  
            outlined
            light 
            depressed 
            color="#66FCF1" 
            class='mx-3'>
            <v-icon>mdi-cart</v-icon>
            Cart
            </v-btn>
  </div>
</v-toolbar-items>

</v-toolbar>

</v-app-bar>

<v-dialog
  v-model="registerDialog"
  max-width="500px"
  transition="dialog-transition"
  >
  <register :done="doneRegister" />
</v-dialog>

<v-dialog
  v-model="loginDialog"
  max-width="500px"
  transition="dialog-transition"
  >
  <login :done="doneLogin" />
</v-dialog>

</div>
</template>




<script>

import register from './Authentication/register.vue'
import login from './Authentication/login.vue'
import {mapGetters} from 'vuex'

export default {
 name: "Header",
 components:{
    register,
    login
 },
 data: ()=>({
    loginDialog: false,
    registerDialog: false
 }),
 computed:{

     ...mapGetters(['user']),

 },
 methods: {
   
    doneRegister(){
      this.registerDialog = false;
    },

    doneLogin(){
      this.loginDialog = false;
    }

 }
}
</script>

<style>
.tittle{
  color: #66FCF1;
}


</style>