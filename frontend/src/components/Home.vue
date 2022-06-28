<template>
    <div class="pa">
        <viewBanners />

      
            <h1 class="mt-1 cyan--text">Our Latest Games</h1>

            <div>
                <viewProducts />
            </div>
        
    </div>

    
</template>

<script>

import viewBanners from './Banner/viewBanners.vue'
import viewProducts from './Product/viewProducts.vue'

export default {
    name: "Home",
    components: {
        viewBanners,
        viewProducts
    }
}
</script>

<style>
.pa{
  
    padding-top: 50px;
}
</style>