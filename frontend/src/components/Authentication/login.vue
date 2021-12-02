<template>
    <v-card>
        <v-card-title class="title">
            <v-icon color="#1F2833">mdi-account</v-icon>
              Login
        </v-card-title>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12" ms="3">
                    <v-text-field
                      label="Email"
                      type="email"
                      solo
                      hide-details
                 
                    >

                    </v-text-field>

                </v-col>

                <v-col cols="12" sm="12" ms="3">
                    <v-text-field
                      label="Password"
                      type="password"
                      solo
                      hide-details
                  
                    >

                    </v-text-field>

                </v-col>
                <div class="mx-2">

                
                <v-checkbox
                   label="keep me logged in"
                   color="#66FCF1"
                   hide-details
                >

                </v-checkbox>
               </div>
            </v-row>
        </v-container>
        <v-card-actions>
            <div class="mx-2" >
          <v-btn color="#66FCF1">
              Login
              </v-btn>
            </div>
        <div class="mx-2">
         <v-btn v-if="done" @click="reset" color="error">
             Close
         </v-btn>
         </div>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {

   name:"login",
   props:['done'],
   methods:{
       reset(){
           if(this.done) this.done()
       }
   }    
}
</script>

<style>

</style>