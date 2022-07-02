<template>
    <v-card class="cyan--text py-5" color="#1F2833" width="500px">

          <h1 class="mb-2 cyan--text text-center">Shipping Address</h1>
          <h3 class="ml-2">Recipient Name: {{recipientName}}</h3>
          <h3 class="ml-2">Phone Number: {{phone}}</h3>
          <h3 class="ml-2">Street Address: {{streetAddress}}</h3>
        
          <h3 class="ml-2">City:  {{city}}</h3>
          <h3 class="ml-2">Suburb: {{suburb}}, {{code}}</h3>

    </v-card>
</template>

<script>
export default {

    name: 'orderShippingAddress',
    props: ['recipientName','phone','streetAddress','Near Building','city','suburb','code']

}
</script>

<style>

</style>