import Vue from 'vue';
import DayOfCalendar from '@/components/DayOfCalendar.vue';
import MonthCalendar from '@/components/MonthCalendar.vue';
import SelectParticipants from '@/components/SelectParticipants.vue';
import SelectRecurrence from '@/components/SelectRecurrence.vue';

Vue.component(DayOfCalendar.tag, DayOfCalendar);
Vue.component(MonthCalendar.tag, MonthCalendar);
Vue.component(SelectParticipants.tag, SelectParticipants);
Vue.component(SelectRecurrence.tag, SelectRecurrence);
