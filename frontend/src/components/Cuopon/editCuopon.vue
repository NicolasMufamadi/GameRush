<template>
    <div>
        <v-card>
             <v-card-title class="cyan--text">Edit Cuopon</v-card-title>
             <v-card-text>

         <form action="">
             <v-text-field
                   filled
                   label='CuoponName'
                   color='#1F2833'
                   v-model="cuoponName"
             >

             </v-text-field>

             <v-text-field
                      filled 
                      label='CuoponAmountOff'
                      color='#1F2833'
                      v-model="cuoponAmountOff"
             >

             </v-text-field>

             <v-text-field
                     filled
                     label='CuoponMinAmount'
                     color='#1F2833'
                     v-model="cuoponMinAmount" 
             >

             </v-text-field>


             <v-text-field
                      filled
                      label='CuoponExpDate'
                      color='#1F2833'
                      v-model="cuoponExpDate"
             >

             </v-text-field>
            
            <div class="d-flex justify-space-between">
                 <v-btn color='cyan' @click="updateCuopon">Update</v-btn>
                 <v-btn color='cyan' @click="cancel">Cancel</v-btn>
            </div>

         </form>
             </v-card-text>
        </v-card>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    name: 'editCuopon',
    props: ['Item','closeEditCuoponDialog'],
    data: ()=>({
        
        Id: '',
        cuoponName: '',
        cuoponAmountOff: '',
        cuoponMinAmount: '',
        cuoponExpDate: ''
    }),

    created(){
        
        this.Id = this.Item.cuoponId
        this.cuoponName = this.Item.cuoponName
        this.cuoponAmountOff = this.Item.cuoponOff
        this.cuoponMinAmount = this.Item.cuoponMinAmount
        this.cuoponExpDate = this.Item.cuoponExpDate

    },

    methods: {
      
        updateCuopon(){
             
            axios.put('http://localhost:8000/cuopons/updatecuopon/'+this.Id,{
                cuoponName: this.cuoponName,
                cuoponOff: this.cuoponAmountOff,
                cuoponMinAmount: this.cuoponMinAmount,
                cuoponExpDate: this.cuoponExpDate
            }).then(response=>{
                if(response){
                    this.$router.go()
                }
            }).catch(err=>{
                console.log(err)
            })

        },

        cancel(){

                this.closeEditCuoponDialog()

        }

    }
    
}
</script>

