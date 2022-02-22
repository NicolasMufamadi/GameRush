<template>
    <div class="d-flex justify-space-between">
        <div>
            <UserCard />
        </div>

       <div class="container mt-16 ml-5">

           <div>
               <h1>Edit Your Password</h1>
           </div>

           <div>
               <form>
                 <div>

                    
                   <v-text-field label="Current Password" filled color="#1F2833">

                   </v-text-field>
                </div>

                <div>
                    <v-text-field label="New Password" filled color="#1F2833">

                    </v-text-field>
                </div>

                <div>
                    <v-text-field label="Confirm New Password" filled color="#1F2833">

                    </v-text-field>
                </div>

                <div  class="d-flex justify-end">
                    <v-btn class="mx-5" color="error" large outlined>Cancel</v-btn>
                    <v-btn color="#1F2833" large outlined>Update</v-btn>
                </div>

               </form>
           </div>

       </div>

    </div>
</template>

<script>
import UserCard from '../UserCard.vue'
export default {
   name: "PasswordForm",
   components:{
      UserCard
   }    
}
</script>

<style>

</style>