import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import EventCrud from '@/views/EventCrud.vue';
import EventAnswering from '@/views/EventAnswering.vue';
import EventView from '@/views/EventView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  }, {
    path: '/event/create',
    name: 'eventCreation',
    component: EventCrud
  }, {
    path: '/event/crud/:id',
    name: 'eventEdition',
    component: EventCrud
  }, {
    path: '/event/:id',
    name: 'eventView',
    component: EventView
  }, {
    path: '/event/:eventId/participant/:participantId',
    name: 'eventAnswering',
    component: EventAnswering
  }
];

const router = new VueRouter({routes});

export default router;
