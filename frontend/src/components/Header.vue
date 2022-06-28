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
  <h2 class="cyan--text"> GameRush</h2>
 </v-toolbar-title>  
<v-spacer></v-spacer>

<v-toolbar-items>
    <v-form>
     <v-text-field
     placeholder="Fifa 19"   
      outlined
      single-line
      hide-details
      background-color="cyan"
      label="Search"
      dense
      append-icon="mdi-magnify"
      light
      solo
      clearable
      color="cyan">
     </v-text-field>
    </v-form>    
  <div>
     <v-btn 
           outlined  
           light 
           depressed 
           color="cyan" 
           to='/'
           class='mx-3'>
          <v-icon>mdi-gamepad</v-icon>
           Games
     </v-btn>
     <v-menu offset-y>
     <template v-slot:activator="{on,attrs}">
    <v-btn
           outlined       
           v-bind="attrs"
           v-on="on"      
           color="cyan"
           class="mx-3"
           
    >
    <v-icon>mdi-account</v-icon>
       {{ user?'MyAccount' : 'Login'}}
             </v-btn>
        </template>
        <v-list>
           <v-list-item @click="registerDialog=true"   v-if="!user">
             <v-list-item-title>
               <v-icon>mdi-account-plus</v-icon>
               Register
             </v-list-item-title>
             </v-list-item>

             <v-list-item  v-if="user" to="/myaccount">
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
           <v-list-item v-if="user" to="/vieworders">
            <v-list-item-title>
            <v-icon>mdi-briefcase-check</v-icon>
                MyOrders
            </v-list-item-title>
           </v-list-item>

           <v-list-item v-if="user && user.data.UserType =='Product Manager'" to='/manageproducts'>
             <v-list-item-title><v-icon>mdi-archive</v-icon>Manage Products</v-list-item-title>
           </v-list-item>

           <v-list-item v-if="user && user.data.UserType == 'Order Manager'">
             <v-list-item-title><v-icon>mdi-briefcase-edit</v-icon>Manage Orders</v-list-item-title>
           </v-list-item>

           <v-list-item v-if="user && user.data.UserType == 'Delivery Manager'">
             <v-list-item-title><v-icon>mdi-truck-check</v-icon>Manage Deliveries</v-list-item-title>
           </v-list-item>

           <v-list-item v-if="user && user.data.UserType =='Admin'" to='/adminpanel'>
             <v-list-item-title><v-icon>mdi-archive-cog</v-icon>Admin Panel</v-list-item-title>
           </v-list-item>

           <v-list-item @click="logout"  v-if="user">
             <v-list-item-title><v-icon>mdi-account-arrow-down</v-icon>Logout</v-list-item-title>
           </v-list-item>

        </v-list>
       </v-menu>
     <v-btn  
            outlined
            rounded
            light 
            depressed 
            color="cyan" 
            class='mx-3'
            to='/cart'>
            <v-icon>mdi-cart</v-icon>
            <span class="ml-1">{{nItems}}</span>
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
  <register :done="doneRegister"/>
</v-dialog>

<v-dialog
  v-model="loginDialog"
  max-width="500px"
  transition="dialog-transition"
  >
  <login :done="doneLogin"/>
 
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
    login,

 },
 data: ()=>({
    loginDialog: false,
    registerDialog: false,
    registered: false,
    CartProducts: [],
    nCartItems: 0,
 }),


 computed:{

    ...mapGetters(['user','Cart','product','nItems','auth'])

 },

created(){

  if(this.user !== null){
       
      this.$store.dispatch('getCart',{UserId: this.user.data.UserId, ProductId: this.product.ProductId})
      this.$store.dispatch('getProducts')
  
  }else{
   
    this.$store.dispatch('logout')
    this.$store.dispatch('clearCart')
 

  }
},

 methods: {


   
    doneRegister(){
      this.registerDialog = false;
      this.registered = true
    },

    doneLogin(){
      this.loginDialog = false;
       this.$router.go('/')
    },
    
    logout(){

        this.$store.dispatch('logout')
        if(this.$route.name !== 'Home'){
          this.$router.go('/')
        }else{
          this.$router.go()
        }
        sessionStorage.clear();
        

    }


 }
}
</script>

<style>
.tittle{
  color: #66FCF1;
}


</style>