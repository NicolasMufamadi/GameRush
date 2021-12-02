<template>
<div>
<v-app id="app">
      <Header/>
</v-app>
</div>
</template>

<script>
import Header from './components/Header.vue'
export default {
  components: { Header },
   name: 'App',
  Components:{
    Header
  }
}
</script>

<style>
</style>