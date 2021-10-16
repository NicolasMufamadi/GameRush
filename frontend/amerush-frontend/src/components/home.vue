<template>
    <Header/>
</template>


<script>
import Header from './header.vue'

export default {
    name: 'Home',
    components: {
        Header
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
*{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
    color: #fff;
    font-size: 25px;
}

body{
      background: #1F2833;
}
</style>