<template>
  <div class="card">
  
  <div>

    <userCard />
  
  </div>
  
   <div class="container">

    <div class="mt-14  ml-4">
      <h1>Personal Details</h1>
    </div>

    <div class="name pa-5  ml-4">
      <div>
        <h3>Name</h3>
      </div>

      <div>
        <v-btn fab outlined light depressed color="#66FCF1">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </div>
    </div>
    <div class="name pa-5  ml-4">
      <div>
        <h3>Email</h3>
      </div>

      <div>
        <v-btn fab outlined light depressed color="#66FCF1">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </div>
    </div>

    <div class="name pa-5  ml-4">
      <div>
        <h3>Password</h3>
      </div>

      <div>
        <v-btn fab outlined light depressed color="#66FCF1">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </div>
    </div>

       <div class="name pa-5 ml-4">
      <div>
        <h3>Mobile Number</h3>
      </div>

      <div>
        <v-btn fab outlined light depressed color="#66FCF1">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </div>
    </div>
   </div>

  </div>
</template>

<script>
import UserCard from "../UserAccount/UserCard.vue";
export default {
  name: "ProfileDetails",
  components: {
    UserCard,
  },

  methods: {},
};
</script>

<style>
.name {
  display: flex;
  justify-content: space-between;
  background-color: #1f2833;
  color: #66fcf1;
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