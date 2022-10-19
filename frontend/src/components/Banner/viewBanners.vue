<template>
    <div class="mt-n10">
        <v-banner color="#1F2833">
         
               <v-carousel cycle height='350'>
                  <v-carousel-item
                          v-for="banner in banners" 
                          :key="banner.bannerId"      
                          reverse-transition="fade-transition"
                          transition="fade-transition"
                  >
        
                      <v-img  class="fill-height" contain :src='banner.bannerImg'>

                      </v-img>

                  </v-carousel-item>
                </v-carousel>
          
        </v-banner>
    </div>
</template>

<script>

import axios from 'axios'


export default {
    name: 'viewBanners',

    data: ()=>({
         
         banners: [],
         bannerImgSrc: '',

    }),

    created(){
        
        axios.get('http://localhost:8000/banners/getbanners')
        .then(response=>{

            this.banners = response.data
            console.log(this.banners)

        }).catch(err=>{
            console.log(err)
        })

    }

}
</script>

<style>

</style>