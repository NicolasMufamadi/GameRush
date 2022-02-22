<template>
<div >
<v-app id="app">
     <Header />
     <v-container >
     
         <router-view />
     </v-container>

     <div class="pa-15 my-15"></div>

     <FooterComponent />
</v-app>
</div>
</template>

<script>
import Header from './components/Header.vue'
import FooterComponent from './components/FooterComponent.vue'
export default {

   name: 'App',
  components:{
    Header,
    FooterComponent
  }
}
</script>

<style>

</style>