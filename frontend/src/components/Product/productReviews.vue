<template>
   <v-card class="mt-10">
      <v-card-title class="cyan--text">Product Reviews</v-card-title>
      <v-divider></v-divider>
      
      <div class="d-flex justify-space-around">
        
        <div v-if="reviews.length > 0" class="boarder">
             <h2 class="cyan--text text-center">Ratings</h2>
             <div>
                 <h4>5<v-icon small class="ml-1 mr-1" color="yellow darken-3">mdi-star</v-icon></h4>
                 <v-progress-linear 
                         v-model="rFive"
                         rounded
                         height="6"
                         class="progress p_1"
                         color="teal"
                 >

                 </v-progress-linear>
                <span class="rating r_1">{{fiveRated}}</span>
             </div>

             <div>
                 <h4>4<v-icon small class="ml-1" color="yellow darken-3">mdi-star</v-icon></h4>
                 <v-progress-linear 
                         v-model="rFour"
                         rounded
                         height="6"
                         class="progress p_2"
                         color="cyan"
                 >

                 </v-progress-linear>
                <span class="rating r_2">{{fourRated}}</span>
             </div>

            <div>
                 <h4>3<v-icon small class="ml-1" color="yellow darken-3">mdi-star</v-icon></h4>
                 <v-progress-linear 
                         v-model="rThree"
                         rounded
                         height="6"
                         class="progress p_3"
                         color="blue"
                 >

                 </v-progress-linear>
                 <span class="rating r_3">{{threeRated}}</span>
             </div>

            <div>
                 <h4>2<v-icon small class="ml-1" color="yellow darken-3">mdi-star</v-icon></h4>
                 <v-progress-linear 
                         v-model="rTwo"
                         rounded
                         height="6"
                         class="progress p_4"
                         color="red lighten-3"
                 >

                 </v-progress-linear>
                 <span class="rating r_4">{{twoRated}}</span>
             </div>


            <div>
                 <h4>1<v-icon small class="ml-1" color="yellow darken-3">mdi-star</v-icon></h4>
                 <v-progress-linear 
                         v-model="rOne"
                         value="0"
                         rounded
                         height="6"
                         class="progress p_5"
                         color="red darkened-3"
                 >

                 </v-progress-linear>
                 <span class="rating r_5">{{oneRated}}</span>
             </div>


        </div>
      
      <div v-if="reviews.length > 0" >
          <v-list v-for="review in reviews" :key="review.ReviewId" three-line>
             <v-list-item-content>
                <v-list-item-title>{{review.Name}} - {{review.ReviewedOn}}</v-list-item-title>
                <v-list-item-subtitle>
                    <v-rating
                         v-model="review.Rating"
                         color="yellow darken-3"
                         background-color="yellow lighten-1"
                         half-increments
                         small
                    >
                    
                    </v-rating>
                     
                </v-list-item-subtitle>
                <v-list-item-subtitle class="ml-2 mb-2 text-wrap">{{review.Comment}}</v-list-item-subtitle>
             </v-list-item-content>
          <v-divider></v-divider>
          </v-list>
      </div>
  
      <div v-else>
              
          <h2 class="text-center">No reviews </h2>    
      
      </div>
    
    </div>
  </v-card>    
</template>

<script>

import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
    name: 'productReviews',
    
    data: ()=>({
       
       reviews: [],
       rFive: 0,
       fiveRated: 0,
       rFour: 0,
       fourRated: 0,
       rThree: 0,
       threeRated: 0,
       rTwo: 0,
       twoRated: 0,
       rOne: 0,
       oneRated: 0,
       nReviews: 0

    }),

    computed: {
       ...mapGetters(['product'])
    },

    async created(){
        let response = await axios.get('http://localhost:8000/reviews/productreviews',{params: {ProductId: this.product.ProductId}})
        this.reviews = response.data 
        this.nReviews = this.reviews.length

       this.filterFive()
       this.filterFour()
       this.filterThree()
       this.filterTwo()
       this.filterOne()

    },

    methods: {
        filterFive(){
            let rev = this.reviews.filter(review => review.Rating == 5 )
            this.fiveRated = rev.length
            this.rFive = (this.fiveRated / this.nReviews) * 100
        },

        filterFour(){
            let rev = this.reviews.filter(review => review.Rating == 4 )
            this.fourRated = rev.length
            this.rFour = (this.fourRated / this.nReviews) * 100
        },

        filterThree(){
            let rev = this.reviews.filter(review => review.Rating == 3 )
            this.threeRated = rev.length
            this.rThree = (this.threeRated / this.nReviews) * 100
        },
        
        filterTwo(){
            let rev = this.reviews.filter(review => review.Rating == 2 )
            this.twoRated = rev.length
            this.rTwo = (this.twoRated / this.nReviews) * 100
        },

        filterOne(){
            let rev = this.reviews.filter(review => review.Rating == 1 )
            this.oneRated = rev.length
            this.rOne = (this.oneRated / this.nReviews) * 100
        }
    }
}
</script>

<style scoped>

.progress{
    position: absolute;
    width: 10%;
    left: 4.5%;
}

.p_1{
    bottom: 218px;
}

.r_1{
    bottom: 211px;
}

.p_2{
   bottom: 194px;
}

.r_2{
    bottom: 187px;
}

.p_3{
    bottom: 170px;
}

.r_3{
    bottom: 163px;
}

.p_4{
   bottom: 146px;
}

.r_4{
    bottom: 139px;
}

.p_5{
   bottom: 122px;
}

.r_5{
    bottom: 115px;
}

.rating{
    position: absolute;
    left: 15%;
}

.boarder{
    border: 1px teal solid;
    height: 250px;
    width: 300px;
    margin: 20px 20px;
}

</style>