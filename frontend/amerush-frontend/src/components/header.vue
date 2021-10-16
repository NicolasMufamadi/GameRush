<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
        <div>
        <h1 class="logo">GameRush</h1>
        </div>
        <div>
              <ul class="link">
                  <li><span class="icon"><font-awesome-icon icon="gamepad"/></span>Games</li>
                  <li><span class="icon"><font-awesome-icon icon="user-plus"/></span>Create Account</li>    
                  <li><span class="icon"><font-awesome-icon icon="sign-in-alt"/></span>Login</li>              
              </ul>
           
        </div>
    </div>
</nav>
</template>

<script>

export default {
    name:'header',
    components:{

    }
}
</script>

<style scoped>
.logo{

    color: #66FCF1;

}

.container-fluid{

display: flex;
justify-content: space-between;
}

li{
    list-style: none;
    display: inline-block;
    border: 1px solid #66FCF1;
    color: #66FCF1;
    margin:0px 25px 0px 25px;
    padding: 0px 10px 0px 10px;
}

li:hover{
    cursor: pointer;
    background-color: #66FCF1;
    color: #000
}

.icon{
   
}

</style>>

