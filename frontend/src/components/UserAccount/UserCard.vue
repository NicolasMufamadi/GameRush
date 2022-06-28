<template>

<div>
 
  <div>

 <v-navigation-drawer class="my-16" height=500  color="cyan" >
    <v-list-item>

        <v-list-item-content class="text-h5 mx-5">My Acount </v-list-item-content>
        <v-list-item-icon><v-icon>mdi-account-circle</v-icon></v-list-item-icon>
    </v-list-item>
     <v-divider></v-divider>
       <v-list nav >

       <v-list-item-group>
         
         <v-list-item   to='/myaccount/personal-details/'>
             
             <v-list-item-icon>
                 <v-icon>mdi-account-edit</v-icon>
             </v-list-item-icon>

             <v-list-item-content >
                 <v-list-item-title>Personal Details</v-list-item-title>
             </v-list-item-content>

         </v-list-item>

       <v-list-item to='/myaccount/address-book'>
             
             <v-list-item-icon>
                 <v-icon>mdi-application-edit</v-icon>
             </v-list-item-icon>

             <v-list-item-content >
                 <v-list-item-title>Address Book</v-list-item-title>
             </v-list-item-content>

     </v-list-item>

       </v-list-item-group>
       </v-list>

 </v-navigation-drawer>
  </div>

</div>

</template>

<script>



export default {
    name:"UserCard",

    data:()=>({
    


    }),

 
    methods:{
      

    }

}
</script>

<style>

</style>