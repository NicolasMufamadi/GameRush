<template>
  <div class="card d-flex justify-space-between">
    <div>
      <UserCard />
    </div>
   <div class="container mt-16 ml-5">

    <div class="mb-5"><h2>Edit Your Name</h2></div>
    <div>
      <form>
        <div>
          <div>
            <v-text-field label="First Name" filled color="#1F2833">
            </v-text-field>
          </div>
          <div>
            <v-text-field label="Last Name" filled color="#1F2833">
            </v-text-field>
          </div>
        </div>
 
           <div class="d-flex justify-end">
            
               <v-btn class="mx-5" color="error" large outlined >Cancel</v-btn>
               <v-btn color="#1F2833" large outlined>Update</v-btn>

           </div>

      </form>
   </div>
      </div>
  </div>
</template>

<script>
import UserCard from "../UserCard.vue";
export default {
  name: "NameForm",
  components: { UserCard },
};
</script>

<style>

</style>