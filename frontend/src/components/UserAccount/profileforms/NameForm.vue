<template>
  <div class="card d-flex justify-space-between">
    <div>
      <UserCard />
    </div>
   <div class="container mt-16 ml-5">

    <div class="mb-5"><h2>Edit Your Name</h2></div>
    <div>
      <form>
        <div>
          <div>
            <v-text-field 
                label="First Name" 
                filled color="#1F2833"
                v-model="FirstName"
                :error= "firstname_err ? true : false"
                :error-messages="firstname_err"    
               
             >
            </v-text-field>
          </div>
          <div>
            <v-text-field
               label="Last Name"
               filled color="#1F2833"
               v-model="LastName"
               :error= "lastname_err ? true : false"
               :error-messages="lastname_err"

            >
            </v-text-field>
          </div>
        </div>
 
           <div class="d-flex justify-end">
            
               <v-btn @click="cancel" class="mx-5" color="error" large outlined>Cancel</v-btn>
               <v-btn @click="update" color="#1F2833" large outlined>Update</v-btn>

           </div>

      </form>
   </div>
      </div>
  </div>
</template>

<script>

import UserCard from "../UserCard.vue";
import {mapGetters} from "vuex"
import axios from 'axios'

export default {
  name: "NameForm",
  
  components: { 
    UserCard
     },

     data:()=>({

         FirstName: '',
         LastName: '',
         Email: '',
         Password: '',
         Phone: '',

         firstname_err: '',
         lastname_err: '',

         Id: ''

     }),
  
  computed:{
     ...mapGetters(['user']),
  },


   
        created(){
       
         this.Id = this.user.data.UserId
         this.FirstName = this.user.data.FirstName
         this.LastName = this.user.data.LastName

 
     },


  methods:{

    async  update(e){
       
       e.preventDefault()
       if(!this.validate()) return false

      await   axios.put(`http://localhost:8000/users/updateuser/name/${this.Id}`,
        {
          FirstName: this.FirstName,
          LastName: this.LastName,

        }).then(data=>{
             console.log(data)
            this.$store.dispatch('getauth',data)
             this.$router.push('/myaccount/personal-details/')
        }).catch(err=>{
          console.log(err)
        })
        
     },

     validate(){
 
       let valid = true

       if(this.FirstName.length < 3){
            this.firstname_err = 'A minimum of 3 characters is required'
            valid = false
       }else if(this.LastName.length < 3){
         this.lastname_err = 'A minimum of 3 characters is required'
         valid = false
       }else{

         this.firstname_err = ''
         this.lastname_err = ''
         valid = true
 
        }
            return valid 
     },



     cancel(){

         this.$router.push('/myaccount/personal-details/')
     },

     //...mapActions(['getauth'])

  }
  

};
</script>

<style>

</style>