import Vue from 'vue';
import VueRouter from 'vue-router';
import EventCRUDComponent from '@/views/EventCRUD.vue';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/event/create',
    name: 'eventCreation',
    component: EventCRUDComponent
  }, {
    path: '/event/:id',
    name: 'eventEdition',
    component: EventCRUDComponent
  }
];

const router = new VueRouter({routes});

export default router;
