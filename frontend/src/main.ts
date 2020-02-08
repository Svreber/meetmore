import Vue from 'vue';
import App from './App.vue';
import router from '@/config/router';

import 'reflect-metadata';
import '@/components/components';
import '@/config/element';

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
