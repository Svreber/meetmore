<template>
  <div class="event-answering">

    <mm-month-calendar v-model="availabilities"
                       class="calendar-item"
                       :month="0"
                       :year="2020">
    </mm-month-calendar>

    <mm-month-calendar v-model="availabilities"
                       class="calendar-item"
                       :month="1"
                       :year="2020">
    </mm-month-calendar>

    <mm-month-calendar v-model="availabilities"
                       class="calendar-item"
                       :month="2"
                       :year="2020">
    </mm-month-calendar>

  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {Event} from '../../../lib/src/Event';
  import {RouterService} from '@/core/services/RouterService';
  import {EventService} from '@/core/services/EventService';
  import {DateAvailabilities} from '@lib/availability/types';

  @Component()
  export class EventAnswering extends Vue {

    event: Event | null = null;
    availabilities: DateAvailabilities = {};

    async mounted(): Promise<void> {
      const eventId = this.$route.params.id;

      if (eventId) {
        this.event = await EventService.getEvent(eventId);
      } else {
        RouterService.goToHome();
      }
    }
  }

  export default EventAnswering;
</script>

<style lang="scss" scoped>
  .event-answering {

    .calendar-item {
      display: inline-block;
      margin: 2rem;
    }
  }
</style>
