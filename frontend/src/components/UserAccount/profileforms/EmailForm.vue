<template>
    <div class="d-flex justify-space-between">
        <div class="mt-16">
            <UserCard />
        </div>

        <div class="container mt-16 ml-5 pt-16">

            <div>
                <h1>Edit Your Email</h1>
            </div>

            <div class="mb-3">
                <h3>Current Email:</h3>
                <span></span>
            </div>
            
            <form >

            <div>
                <v-text-field label="New Email" filled color="#1F2833">

                </v-text-field>
            </div>

            <div>
                <v-text-field label="Confirm-Email" filled color="#1F2833">

                </v-text-field>
            </div>

            <div class="d-flex justify-end">
                                
               <v-btn class="mx-5" color="error" large outlined >Cancel</v-btn>
               <v-btn color="#1F2833" large outlined>Update</v-btn>

            </div>

        </form>

    </div>
  </div>
</template>

<script>
import UserCard from '../UserCard.vue'
export default {

   name: "EmailForm",
   components: {UserCard}

}
</script>

<style>

</style>