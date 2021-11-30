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
   GameRush
 </v-toolbar-title>  
<v-spacer></v-spacer>

<v-toolbar-items>
    <v-form>
     <v-text-field
     v-model="search"
     placeholder="Fifa 19"   
      outlined
      single-line
      hide-details
      background-color="#1F2833"
      label="Search"
      dense
      append-icon="mdi-magnify"
      dark
      solo
      clearable
      color="#66FCF1">
     </v-text-field>
    </v-form>    
  <div>
     <v-btn 
           outlined  
           light 
           depressed 
           color="#66FCF1" 
           class='mx-3'>
          <v-icon>mdi-gamepad</v-icon>
           Games
     </v-btn>
     <v-menu offset-y>
     <template v-slot:activator="{on,attrs}">
    <v-btn
           outlined
           light
           v-bind="attrs"
           v-on="on"
           depressed
           color="#66FCF1"
           class="mx-3"
    >
    <v-icon>mdi-account</v-icon>
         My Account
           </v-btn>
        </template>
        <v-list>
           <v-list-item link >
             <v-list-item-title>
               <v-icon>mdi-account-plus</v-icon>
               Register
             </v-list-item-title>
           </v-list-item>
            <v-list-item link >
             <v-list-item-title>
               <v-icon>mdi-account-arrow-up</v-icon>
               Login
             </v-list-item-title>
           </v-list-item>
        </v-list>
       </v-menu>
     <v-btn  
            outlined
            light 
            depressed 
            color="#66FCF1" 
            class='mx-3'>
            <v-icon>mdi-cart</v-icon>
            Cart
            </v-btn>
  </div>
</v-toolbar-items>

</v-toolbar>

</v-app-bar>

</div>

</template>

<script>

export default {
 name: "Header"  
}
</script>

<style>
.tittle{
  color: #66FCF1;
}


</style>