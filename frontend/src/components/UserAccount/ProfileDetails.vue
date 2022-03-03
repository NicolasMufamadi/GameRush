<template>
  <div class="card">
  
  <div>

    <userCard />
  
  </div>
  
   <div class="container">

    <div class="mt-14  ml-4">
      <h1>Personal Details</h1>
    </div>

    <div class="name pa-5  ml-4 cyan--text">
      <div>
        <h3>Name</h3>
        <span>{{user.data.FirstName}} {{user.data.LastName}}</span>
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
        <span>{{user.data.Email}}</span>
      </div>

      <div>
        <v-btn fab outlined light depressed color="cyan" to='/myaccount/personal-details/email'>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </div>
    </div>

    <div class="name pa-5  ml-4 cyan--text">
      <div>
        <h3>Password</h3>
        <span>update your password</span>
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
        <span>{{user.data.Phone}}</span>
      </div>

      <div>
        <v-btn fab outlined light depressed color="cyan" to='/myaccount/personal-details/phone'>
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



  methods: {
   

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