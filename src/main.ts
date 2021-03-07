import Vue from 'vue';
//@ts-ignore
import App from './App.vue';
import router from './router';
import store from './store';
import Axios from 'axios';

import vuetify from './plugins/vuetify';
import './styles/app.scss';
Vue.config.productionTip = false;

const baseApiUrl = Axios.create({
  baseURL: 'https://mkwavcscdh.execute-api.us-east-1.amazonaws.com/prod'
});

Vue.prototype.$http = baseApiUrl;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
