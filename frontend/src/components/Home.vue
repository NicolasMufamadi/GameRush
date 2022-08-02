<template>
    <div class="pa">
        <viewBanners />

            <div>
                <h1 class="mt-1 cyan--text">Our Latest Games</h1>
                <viewProducts />
            </div>

            <div>
                <h1 class="mt-1 cyan--text">Best selling</h1>
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
    },

}
</script>

<style>
.pa{
  
    padding-top: 50px;
}
</style>