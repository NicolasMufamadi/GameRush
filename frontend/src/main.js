import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import Vuelidate from 'vuelidate'

Axios.defaults.baseURL = process.env.BASE_URL

Vue.config.productionTip = false
Vue.use(Vuetify,{
  iconfont: 'mdi'
})
Vue.use(Vuelidate)

const vuetify = new Vuetify({});


new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')

