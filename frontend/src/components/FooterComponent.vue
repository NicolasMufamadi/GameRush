<template>
<div>
     
     <v-footer color="#1F2833" dark absolute>

       <v-card color="#1F2833" flat  class="text-center" >

           <v-card-text>
              <v-btn 
                 v-for="icon in icons" 
                 :key="icon"
                 class="mx-4"
                 icon
                 color="cyan"
                
               >

               <v-icon size="24px">{{icon}}</v-icon>

              </v-btn>
           </v-card-text>
                
           <v-card-text   class="text-lg-h6 cyan--text">
          
                 "Some trees flourish, others die. Some cattle grow strong, others are taken by wolves. Some men are born rich enough and dumb enough to enjoy their lives. Ain’t nothing fair." John Marston, Red Dead Redemption

           </v-card-text>

           <v-divider></v-divider>

           <v-card-text class="cyan--text"> 
                &copy;2022 - <strong>GameRush</strong>         
            </v-card-text>

       </v-card>

     </v-footer>

 
</div>
</template>

<script>

export default {

    name: "FooterComponent",
    data:()=>({

          icons: [
              'mdi-gamepad',
              'mdi-gamepad-circle',
              'mdi-gamepad-variant',
              'mdi-google-controller'
          ]

    })
    
}
</script>

<style>

</style>