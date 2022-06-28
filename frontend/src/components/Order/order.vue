<template>
    <div class="order">
        <h1 class="mt-2 cyan--text text-center">Order Successfully Placed</h1>
        <div class="d-flex justify-center">
            <v-icon class="icon">mdi-package-variant-plus</v-icon>
        </div>
       <div class="d-flex justify-space-between">
           <v-btn small outlined color='teal' to="/">Continue shopping</v-btn>
           <v-btn small outlined color="teal" to="/vieworders">View Orders</v-btn>
      </div> 
    </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'Order',
  computed: {
       ...mapGetters(['user','product'])
  },  
  created() {
    if(this.user !== null){ 
       this.$store.dispatch('getCart',{UserId: this.user.data.UserId, ProductId: this.product.ProductId})
       this.$store.dispatch('addProduct',{UserId: this.user.data.UserId, ProductId: this.product.ProductId})
   }
  }   
}
</script>

<style scoped>

.icon{
  font-size: 12.5rem;
  color: teal;
}
</style>