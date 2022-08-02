<template>
    <div>
        <div class="cyan--text">
            <h1>Manage Users</h1>
        </div>
        <div class="mt-2">
            <template>
                <v-text-field v-model="search" label="Search User" filled color="#1F2833" >

                </v-text-field>
            </template>
        </div>
        <div>
            <v-btn color="cyan"><v-icon>mdi-filter-variant</v-icon>Filter</v-btn>
        </div>

        <div>
            <v-data-table :item-class="bannedUserRow" :headers="headers" :items="users" :search="search">

                  <template v-slot:[`item.action`]="{ item }">
                      <v-menu offset-y>
                      <template v-slot:activator="{on, attrs }">
                          <v-btn icon v-on="on" v-bind="attrs">

                         <v-icon small class="mr-2" @click="editItem(item)">mdi-dots-vertical</v-icon>
                         
                          </v-btn>

                  </template>
                    <v-list>
                        <v-list-item @click="RolesDialog=true">
                            <v-list-item-title><v-icon>mdi-pencil</v-icon>
                                Modify Roles
                            </v-list-item-title>
                        </v-list-item>
          
                        <v-list-item @click="BanDialog=true">
                            <v-list-item-title><v-icon>{{Banned ?  'mdi-checkbox-marked-circle-outline'  :'mdi-cancel'}}</v-icon>
                               {{Banned ? 'unban' : 'ban'}}
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                      </v-menu>
                  </template>
         
            </v-data-table>
        </div>
       <v-dialog v-model="RolesDialog"   max-width="400px" transition="dialog-top-transition">
        <v-card>
            <v-card-title class="cyan--text">Modify Roles</v-card-title>
            <v-card-text >
                Check the box to grant role,uncheck to change role
             <v-container class="mt-0">
 
            
                <div>
                     <v-checkbox v-model="selected" value="Admin" color="cyan" label="Admin" >

                     </v-checkbox>
                </div>
              

               <div>
                      <v-checkbox v-model="selected" value="Product Manager" color="cyan" label="Product Manager">

                      </v-checkbox>
               </div>
                 <div>
                       <v-checkbox v-model="selected" value="Order Manager" color="cyan" label="Order Manager">

                       </v-checkbox>
                  </div>
                   <div>
                        <v-checkbox v-model="selected" value="Delivery Manager" color="cyan" label="Delivery Manager"></v-checkbox>
                    </div>
                   
                   <div>
                        <p>Confirm this email:<span><h4 class="cyan--text">{{Email}}</h4></span></p>
                   </div>
               
                <div>

                       <v-text-field
                                 :error="email_err ? true : false" 
                                 :error-messages="email_err" 
                                 v-model="Confirm_Email"
                                 color="cyan"
                                 filled label="Confirm Email">
                      </v-text-field>
                </div>
                <div class="d-flex justify-space-between">
                    <v-btn @click="updateRole" class="cyan--text" color="#1F2833"><v-icon color="cyan">mdi-pencil</v-icon>Update</v-btn>
                    <v-btn class="error" @click="closeRolesDialog"><v-icon>mdi-close</v-icon>Cancel</v-btn>
                </div>


             </v-container>

            </v-card-text>
         </v-card>
      </v-dialog>
    <v-dialog  v-model="BanDialog" max-width="350" transition="dialog-bottom-transition">
        <v-card color="#1F2833">
            <v-card-title class="white--text  ml-16">Confirm Action</v-card-title>
              <div class="white--text ml-5 mb-3  text-center">
                  {{Banned ?'Are you sure you want to unban this user?': 'Are you sure you want to ban this user?'}}
              </div>
                <div class=" d-flex justify-space-around">
                    <v-btn @click="ban" plain color="error">Yes</v-btn>
                    <v-btn @click="closeBanDialog" plain color="cyan" >No</v-btn>
                </div>
         
        </v-card>
      </v-dialog>

 </div>
</template>

<script>

import axios from 'axios'
import {mapGetters} from 'vuex'


export default {
 name: "ViewUser",
 components:{
     //modifyRoles
 },
 data:()=>({

      search: '',
      users: [],
      Customer: 'Customer',
      selected: '',
      Id: '',
      Email: '',
      Banned: '',
      Confirm_Email: '',
      email_err: '',
      editedIndex: -1,
      icon: 'mdi-pencil',
      Role: '',
      RolesDialog: false,
      BanDialog: false


 }),
 
 computed:{

   ...mapGetters(['user']),    

         headers(){ 
        
        
         return [
          {
              text: 'Name',
              align: 'start',
              sortable: false,
              value: 'FirstName',
              

          },
          {
              text: 'Email',
              sortable: false,
              filterable: false,
              value: 'Email' 

          },

          {
              text: 'Phone',
              sortable: false,
              filterable: false,
              value: 'Phone'
          },
          {
              text: 'Role',
              sortable: false,
              value: 'UserType'
          },
          
          {
              text: 'Action',
              sortable: false,
              value: 'action'
          }

        ]
   }
 },

 created(){

    if(this.user !== null && this.user.data.UserType === 'Admin'){
        
        axios.get('http://localhost:8000/users/getusers')
        .then(response=>{
            if(response){
                this.users = response.data
            }
        }).catch(err=>{
            console.log(err)
        })
         
    }else{
        
        this.$router.push('/')
    }


 },

 beforeMount(){

  axios.post('http://localhost:8000/users/checkauth',this.user,{
          headers:{
            'content-type': 'text/json',
            'Authorization': 'Bearer'+ ' '+ localStorage.getItem('token')
          }
        }).then((response)=>{
              
              if(response.data.Authorization !== 'LoggedIn'){
                    this.$store.dispatch('logout')
              }

        }).catch(console.log())
    
  },

 methods:{

   closeRolesDialog(){
       this.RolesDialog = false
   },

   closeBanDialog(){
      this.BanDialog = false
   },

   editItem(item){
       this.Id = item.UserId
       this.editedIndex = this.users.indexOf(item)
       this.Email = item.Email
       this.selected = item.UserType
       this.Banned = item.IsBanned
   },

   updateRole(){

       if(!this.verifyUpdate()) return false
 
        if(this.editedIndex > -1){
            axios.put(`http://localhost:8000/users/updateuser/role/${this.Id}`,{
               UserType: this.selected || this.Customer
            }).then(data=>{

                Object.assign(this.users[this.editedIndex],data.data)
             
            })
        }else{
            this.users.push({})
        }
       this.closeRolesDialog()
     
   },

   verifyUpdate(){
      let valid = true
 
      if(this.Email !== this.Confirm_Email){
          this.email_err = "Enter the correct email to verify this update"
          valid = false
      }else{
          this.email_err= null
          this.Confirm_Email = null
      }

      return valid
   },
   
   ban(){

        axios.put('http://localhost:8000/users/updateuser/ban/',{
            Email: this.Email,
            IsBanned: !this.Banned
        }).then((response)=>{
           if(response !== 'Admin'){
            this.$router.go('/manageuser')
            this.closeBanDialog()
           }else{
              console.log('you cannot ban this user')
           }   
        }).catch((console.log()))
    

   },

   bannedUserRow(item){
       return item.IsBanned ? 'bannedcolumn' : ''
   },

 }

 }

</script>

<style>
.bannedcolumn{
    background-color: red;
    color: white;

}

.bannedcolumn:hover {
    background-color: rgb(194, 78, 78) !important;
}

</style>