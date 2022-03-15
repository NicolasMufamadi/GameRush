import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import UserCard from '../components/UserAccount/UserCard'
import ProfileDetails from '../components/UserAccount/ProfileDetails'
import PageNotFound from '../components/NotFound'
import NameForm from '../components/UserAccount/profileforms/NameForm'
import EmailForm from '../components/UserAccount/profileforms/EmailForm'
import PasswordForm from '../components/UserAccount/profileforms/PasswordForm'
import PhoneForm from '../components/UserAccount/profileforms/PhoneForm'
import AdminPanel from '../components/Manager/AdminPanel'
import ViewUsers from '../components/Manager/User/ViewUsers'
import ManageProducts from '../components/Manager/Product/ManageProducts'

Vue.use(VueRouter)

const routes = [

    {
         path: '/',
         name: 'Home',
         component: Home
    },

    {
         path: '/myaccount',
         name: 'MyAccount',
         component: UserCard
    },

    {
        path: '/myaccount/personal-details/',
        name: 'Personal-Details',
        component: ProfileDetails
    },

    {

        path: '/myaccount/personal-details/name',
        name: 'UpdateName',
        component: NameForm

    },

    {
        path: '/myaccount/personal-details/email',
        name: 'UpdateEmail',
        component: EmailForm
    },

    {
        path: '/myaccount/personal-details/password',
        name: 'UpdatePassword',
        component: PasswordForm
    },

    {
        path: '/myaccount/personal-details/phone',
        name: 'UpdateNumbers',
        component: PhoneForm
    },

    {
        path: '/adminpanel',
        name: 'Admin Panel',
        component: AdminPanel 
    },

    {
        path: '/manageuser',
        name: 'Manage User',
        component: ViewUsers
    },

    {
        path: '/manageproducts',
        name: 'Manage Products',
        component: ManageProducts
    },

    {
        path: '/PageNotFound',
        name: '404',
        component: PageNotFound
    },

    {path:'*',redirect:'/PageNotfound'}


];

const router = new VueRouter({

    mode: 'history',
    routes
})

export default router