<template>
  <div>
     
     <input type="file" name="bannerImg" style="display:none" ref="changeImage" @change="onChange">
     <v-btn 
            small
            outlined  
            class="ml-12 mb-2"
            color="#1F2833"
            @click="$refs.changeImage.click()">
            ChangeImage
     </v-btn>
     <span>{{file}}</span>
     <v-img contain :src="image" max-width="250" max-height="200"></v-img>
      <div>
          <v-btn 
              small
              outlined
              class="ml-12 mt-2 mb-2"
              color="#1F2833"
              @click="saveImage">
               SaveImage
           </v-btn>
      </div>
  </div>
</template>

<script>

import axios from 'axios'

export default {
   name: "changeBannerImg",
   props: ['image','Id'],
   data: ()=>({
        bannerImg: '',
        file: ''
   }),
   
   methods:{
    
    onChange(e){

            this.bannerImg = e.target.files[0] 
            this.file = this.bannerImg.name

    },

    saveImage(){
        
        var fd = new FormData()

        fd.append('bannerImg',this.bannerImg,this.bannerImg.name)

          axios.put('http://localhost:8000/banners/updatebannerimage/'+this.Id,fd,{})
          .then(response=>{
              if(response){
                  console.log(response)
              }
          }).catch(err=>{
              console.log(err)
          })

    }

   }
}
</script>

<style>

</style>