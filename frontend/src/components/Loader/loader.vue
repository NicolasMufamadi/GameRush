<template>
    <div class="d-flex justify-center">
       <v-card  >
           <span>Registering user...</span>
           <v-card-actions>
          <div> 

           <v-progress-circular 
              :rotate="90"
              :size="100"
              :width="15"
              :value="value"
              color="cyan"
            
      
           >
              {{ value }}
           </v-progress-circular>
          </div>
        </v-card-actions>
       </v-card>
    </div>
</template>

<script>
export default {
    name: 'Loader',
    prop: ['interval'],
    data:()=>({

          value: 0,


    }),
   

   beforeDestroyed(){
        
        clearInterval(this.interval)
    },

    mounted() {
       
          this.interval = setInterval(this.loadProgress,1000) 

    },

    methods: {
        loadProgress(){
            if(this.value == 100){
              
               this.$router.go('/')
               return (this.value = 0)
                
            }else{
                this.value += 10
            }  
        },


    }
}
</script>

<style scoped>

</style>