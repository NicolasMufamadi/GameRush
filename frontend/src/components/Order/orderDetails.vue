<template>
    <v-card class="cyan--text py-5"  color="#1F2833" width="500px">
        
        <h1 class="cyan--text mb-2 text-center">Order Details</h1>
        <h3 class="ml-2">Items: {{nItems}}</h3>
        <h3 class="ml-2" v-if="deliveryFee == 'Free'">Delivery Fee: Free Delivery</h3>
        <h3 class="ml-2" v-else>Delivery Fee: R {{deliveryFee}}</h3>
        <h3 class="ml-2">Total Amount: R {{total}}</h3>
        <h3 class="ml-2">Placed: {{date}}</h3>
        <h3 class="ml-2">Delivery: {{deliveryDate}}</h3>

    </v-card>
</template>

<script>
export default {
    name: 'orderDetails',
    props: ['nItems','deliveryFee','total','date','deliveryDate']
}
</script>

<style scoped>

</style>