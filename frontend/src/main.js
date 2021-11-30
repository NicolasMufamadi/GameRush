import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(Vuetify,{
  iconfont: 'mdi'
})
const vuetify = new Vuetify({});


new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
