<template>
  <div class="card">
  
  <div>

    <userCard />
  
  </div>
  
   <div class="container">

    <div class="mt-14  ml-4">
      <h1 class="cyan--text">Personal Details</h1>
    </div>

    <div class="name pa-5  ml-4 cyan--text">
      <div>
        <h3>Name</h3>
        <span>{{ user ? user.data.FirstName : ''}} {{user? user.data.LastName :''}}</span>
      </div>

      <div>
        <v-btn fab outlined light depressed color="cyan" to='/myaccount/personal-details/name'>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </div>
    </div>
    <div class="name pa-5  ml-4 cyan--text">
      <div>
        <h3>Email</h3>
        <span>{{ user ? user.data.Email : ''}}</span>
      </div>

      <div>
        <v-btn fab outlined light depressed color="cyan" to='/myaccount/personal-details/email'>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </div>
    </div>

    <div class="name pa-5  ml-4 cyan--text">
      <div>
        <h3>Update your password</h3>
      </div>

      <div>
        <v-btn fab outlined light depressed color="cyan" to='/myaccount/personal-details/password'>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </div>
    </div>

       <div class="name pa-5 ml-4 cyan--text">
      <div>
        <h3>Mobile Number</h3>
        <span>{{user ? user.data.Phone : ''}}</span>
      </div>

      <div>
        <v-btn  fab outlined light depressed color="cyan" to='/myaccount/personal-details/phone'>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </div>
    </div>
   </div>

  </div>
</template>

<script>

import UserCard from "../UserAccount/UserCard.vue";
import {mapGetters} from 'vuex'
import axios from "axios"

export default {
  name: "ProfileDetails",
  components: {
    UserCard,
  },

  computed:{
       ...mapGetters(['user']),
  },

  data:()=>({
            

  }),

  beforeMount(){

        axios.post('http://localhost:8000/users/checkauth',this.user,{
          headers:{
            'content-type': 'text/json',
            'Authorization': 'Bearer'+ ' '+ localStorage.getItem('token')
          }
        }).then(response=>{
              if(response.data.Authorization !== 'LoggedIn'){
                     this.$router.push('/')
                     this.$store.dispatch('logout')
              }
        }).catch(console.log())
    
  },

};
</script>

<style>
.name {
  display: flex;
  justify-content: space-between;
  background-color: #1f2833;
  color: cyan;
  margin-bottom: 20px;
}

.name:hover {
  cursor: pointer;
}

.card{
 
 margin-top: 50px;
 display: flex;
 justify-content: space-around;

}

</style>