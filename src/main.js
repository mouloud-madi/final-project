import Vue from "vue";
import App from "./App.vue";
import router from "./router";

//vue-bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

//Toastify
import VueToastify from "vue-toastify";
Vue.use(VueToastify);
 
Vue.config.productionTip = false;
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

