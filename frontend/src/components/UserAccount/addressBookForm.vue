<template>
    <div class="card">
       <userCard />

       <div class="container mt-14 ml-4">
              <h1 class="cyan--text">Address Book</h1>
          <v-card>
              <v-card-text>
                  <h3>Add New Address</h3>

                  <v-form>

                    <v-row class="mt-2 ml-2" >
                        <v-radio-group  
                           required 
                           v-model="addressType"
                           :error-messages="addressTypeErrors"
                          @change="$v.addressType.$touch()"
                          @blur="$v.addressType.$touch()"

                        >

                            <v-radio  
                                 value="Business"        
                                 color='cyan'                              
                                 label='Business'>
                            </v-radio>
    
                            <v-radio      
                                value="Residential"                        
                                color='cyan'
                                label='Residential'
                            >
                            </v-radio>

                        </v-radio-group>
                    </v-row>

                    <v-text-field
                       v-model="recipientName"
                       label='Recipient Name'
                       color='cyan' 
                       required       
                       :error-messages="recipientNameErrors"   
                       @input="$v.recipientName.$touch()"
                       @blur="$v.recipientName.$touch()"
                    >

                    </v-text-field>

                    <v-text-field
                       v-model="phoneNumber"
                       label='Recipient Mobile Number'
                       color='cyan' 
                       required
                       :error-messages="numberPhoneErrors"
                       @input="$v.phoneNumber.$touch()"
                       @blur="$v.phoneNumber.$touch()"
                    >

                    </v-text-field>

                    <v-text-field
                        v-model="streetAdrress"
                        label='Street Address'
                        color='cyan'
                        hint='eg. 53a 4th Avenue'
                        required
                        :error-messages="streetAdrressErrors"
                       @input="$v.streetAdrress.$touch()"
                       @blur="$v.streetAdrress.$touch()"
                    >

                    </v-text-field>

                    <v-text-field
                        v-model="nearBuilding"
                        label='Complex/Building(Optional)'
                        color='cyan'
                        hint='Complex or Building Name, unit number or floor'
                        required
                    >

                    </v-text-field>

                    <v-text-field
                        v-model="suburb"
                        label='Suburb'
                        color='cyan'
                        required
                        :error-messages="suburbErrors"
                       @input="$v.suburb.$touch()"
                       @blur="$v.suburb.$touch()"
                    >

                    </v-text-field>

                    <v-text-field
                         v-model="city"
                         label='City/Town'
                         color='cyan'
                         class="mb-2"
                         required
                         :error-messages="cityErrors"
                        @input="$v.city.$touch()"
                        @blur="$v.city.$touch()"
                    >

                    </v-text-field>
                    <v-row>
                      <v-col cols='6'>
                       <v-select
                           v-model="select"
                           dense
                           label='Province'
                           :menu-props='{ top:true, offsetY: true}'
                           :error-messages="provinceErrors"
                           :items="provinces"
                           required
                           @change="$v.select.$touch()"
                           @blur="$v.select.$touch()"
                          >

                       </v-select>
                      </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols='3'>
                            <v-text-field 
                                v-model="postalCode"
                                label='Postal Code'
                                color='cyan'
                                required
                                :error-messages="postalCodeErrors"
                                @input="$v.postalCode.$touch()"
                                @blur="$v.postalCode.$touch()"
                            >

                            </v-text-field>
                        </v-col>
                    </v-row>
                  </v-form>
                
              </v-card-text>
                
                 <div class="d-flex justify-space-between">
                       <v-btn class="mb-2 ml-2" color='red' @click="cancel">
                           Cancel
                       </v-btn>
                      <v-btn class="mb-2 mr-2 px-6" color='cyan' @click="submitForm">
                         Save
                     </v-btn>
                </div>

          </v-card>
       </div>
    </div>
</template>

<script>

import userCard from './UserCard.vue'
import { required, maxLength, minLength, numeric } from 'vuelidate/lib/validators'
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
   name: "addressBookForm",
   components: {
       userCard
   },
   
   data:()=>({
        
        addressType: '',
        provinces: ['Eastern Cape','Free State','Gauteng','KwaZulu-Natal','Limpopo','Mpumalanga','Northern Cape','North West','Western Cape'],
        recipientName: null,
        numberPhone: '',
        streetAdrress: '',
        suburb: '',
        city: '',
        select: null,
        nearBuilding: '',
        postalCode: '',
        phoneNumber: '',
        valid: true,
        UserId: '',
    
   }),

   created(){
         
          if(this.user !== null){
              this.UserId = this.user.data.UserId
          }else{
              this.$router.push('/')
          }

   },

   validations: {
        
         addressType: { required },
         phoneNumber: { required, minLength: minLength(10),maxLength: maxLength(10), numeric },
         recipientName: { required },
         streetAdrress: { required },
         suburb: { required },
         city: { required },
         nearBuilding: { required },
         select: { required },
         postalCode: { required, minLength: minLength(4), maxLength: maxLength(4), numeric } 
   },

   computed: {

       ...mapGetters(['user']),

       addressTypeErrors(){
            const errors = []
            if(!this.$v.addressType.$dirty) return errors
            !this.$v.addressType.required && errors.push('Please choose one')
            return errors
       },

        provinceErrors(){
           const errors = []
            if(!this.$v.select.$dirty){
                return errors    
            } 
           !this.$v.select.required && errors.push('Please select the province')
           return errors
       },

       recipientNameErrors(){
           const errors = []
           if(!this.$v.recipientName.$dirty) {
                 return errors
             }
           !this.$v.recipientName.required && errors.push('Please enter the recipient name')
          return errors
       },

       numberPhoneErrors(){
           const errors = []
           if(!this.$v.phoneNumber.$dirty){
                return errors
            }
           !this.$v.phoneNumber.required && errors.push('Please enter mobile number')
           !this.$v.phoneNumber.numeric && errors.push('Please enter a 10-digit SA phone number without country code, spaces, or special characters')
           !this.$v.phoneNumber.minLength && errors.push('Please enter a 10-digit SA phone number without country code, spaces, or special characters')
           !this.$v.phoneNumber.maxLength && errors.push('Please enter a 10-digit SA phone number without country code, spaces, or special characters')
          return errors
       },

         suburbErrors(){
           const errors = []
           if(!this.$v.suburb.$dirty){
                return errors
            }
           
           !this.$v.suburb.required && errors.push('Please enter the suburb')
           return errors

       },

       streetAdrressErrors(){
            const errors = []
            if(!this.$v.streetAdrress.$dirty){

                 return errors
             }
            !this.$v.streetAdrress.required && errors.push('Please enter the street address')
           return errors
       },

       cityErrors(){
           const errors = []
           if(!this.$v.city.$dirty) {
 
               return errors
            }
           !this.$v.city.required && errors.push('Please enter the city')
          return errors
       },

       postalCodeErrors(){
            const errors = []
            if(!this.$v.postalCode.$dirty) return errors
            !this.$v.postalCode.minLength && errors.push('Please enter a 4 digit code ')
            !this.$v.postalCode.maxLength && errors.push('Please enter a 4 digit code')
            !this.$v.postalCode.required && errors.push('Please enter the code ')
            !this.$v.postalCode.numeric && errors.push('Enter digits only')
            return errors
       }
   },

   methods:{

     submitForm(){
            
          axios.post('http://localhost:8000/address/add/address',{
            UserId:               this.UserId,
            AdressType:           this.addressType,
            RecipientName:        this.recipientName,
            RecipientMobile:      this.phoneNumber,
            StreetAdress:         this.streetAdrress,
            GeographicalFeature:  this.nearBuilding,
            Suburb:               this.suburb,
            City:                 this.city, 
            Province:             this.select,
            PostalCode:           this.postalCode,
        }).then(response=>{
            if(response){
                this.$router.back()
            }
        }).catch((err)=>{
              
           if(err){
               this.$v.$touch()
           }
            
        })

     },


     validate(){
          
     },
     
     cancel(){
         this.$router.back()
     }

   }
}
</script>

<style scoped>

</style>