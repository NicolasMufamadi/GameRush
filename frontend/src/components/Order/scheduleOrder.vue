<template>
    <v-card>
         <h2 class="cyan--text text-center">select a new delivery date</h2>
        <v-card-title>    
            <v-toolbar>
                <v-btn fab text @click="$refs.calendar.prev()"><v-icon>mdi-chevron-left</v-icon></v-btn>
                <v-toolbar-title v-if="$refs.calendar">{{$refs.calendar.title}}</v-toolbar-title>
                <v-btn fab text @click="$refs.calendar.next()"><v-icon>mdi-chevron-right</v-icon></v-btn>
            </v-toolbar>
        </v-card-title>
        
        <v-card-text>
            <v-sheet heigh="350">
                <v-calendar
                    v-model="focus"
                    ref="calendar"
                    @click:date="viewDay"
                    :type="type"
                >

                </v-calendar>
            </v-sheet>   
        </v-card-text>

        <p v-if="valid == false" class="text-center red--text">{{selectDate}}</p>
        <p v-if="valid == true && delivered == true" class="text-center red--text">{{message}}</p>
        <p v-if="valid == true && pastDate == true" class="text-center red--text">{{dateErr}}</p>
        
        <div class="d-flex justify-space-between">
             <v-btn class="cyan ml-2 mb-2" @click="submit">submit</v-btn>
             <v-btn class="red mr-2 mb-2" @click="close">cancel</v-btn>
        </div>
    
    </v-card>
</template>

<script>
import axios from 'axios'
export default {
   
   name: 'scheduleOrder',

   props: ['closeCalendar','Id','status','date'],
   
   data: () => ({
      
      focus: '',
      type: 'month',
      response: '' ,
      newDate: '',
      months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
      selectDate: '',
      valid: true,
      delivered: false,
      pastDate: false,
      orderStatus: '',
      message: '',
      dateErr: ''


   }),


    mounted(){
       
        this.$refs.calendar.checkChange()
        this.focus = this.$refs.calendar._data.times.today.date
    },
    
    onchange(){
       this.$refs.calendar.checkChange()
       console.log(this.focus)
    },

    async created(){
        let order = await axios.get('http://localhost:8000/orders/getorder/',{params: {OrderId: this.Id}})
        this.orderStatus = order.data.OrderStatus
    },
    
    methods: {

        viewDay({date}){
           this.focus = date  
           let  dateObj = new Date(this.focus)
           this.newDate = dateObj.getDate() +'-'+ this.months[dateObj.getMonth()] +'-'+ dateObj.getFullYear()    
        },

        async submit(){
            
           if(this.checkStatus()) return false 

           if(this.checkDate()) return false

           if(this.newDate != ''){
               
            this.response = await axios.put('http://localhost:8000/orders/'+this.Id,{
                OrderStatus: this.status,
                DeliveryDate: this.newDate 
            })

              this.closeCalendar()
              console.log(this.focus)
              this.$router.go('')

            }else{
                this.valid = false 
                this.selectDate = 'Select a date for delivery'
            }

        },

        checkStatus(){
           if(this.orderStatus == 'Delivered'){
                this.delivered = true
                this.message = 'You cannot schedule a delivered order'

           }else{
            this.message = ''
           }

           return this.delivered
        },

        checkDate(){
            
            let date = new Date()
            let fdate = date.getFullYear() +'-'+ date.getMonth() +'-'+ date.getDate()           

            if( this.orderStatus != 'Delivered' && this.focus < fdate){
               this.pastDate = true 
               this.dateErr = 'Please cancel and  select a valid date'
            }

            return this.pastDate

        },

        close(){
            this.closeCalendar()
            this.focus = ''
            this.valid = true 
            this.selectDate = ''
        }
    }

}
</script>

<style>
</style>