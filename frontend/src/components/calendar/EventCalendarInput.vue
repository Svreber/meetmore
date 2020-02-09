<template>
  <div class="event-calendar">
    <mm-month-calendar-input v-for="(yearMonth, index) in monthsRange" :key="index"
                             v-model="eventAvailabilities.availabilities"
                             class="calendar-item"
                             :month="yearMonth.month"
                             :year="yearMonth.year">
    </mm-month-calendar-input>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {CalendarService} from '../../core/services/CalendarService';
  import {Event} from '../../../../lib/src/Event';
  import {EventAvailabilitiesByParticipant} from '../../../../lib/src/availability/EventAvailabilitiesByParticipant';
  import {IYearMonth} from '../../core/interfaces/IYearMonth';
  import {Participant} from '../../../../lib/src/Participant';

  @Component({
    name: EventCalendarInput.tag
  })
  export class EventCalendarInput extends Vue {
    static tag = 'mmEventCalendarInput';

    @Prop({required: true})
    event: Event;
    @Prop({required: true})
    eventAvailabilities: EventAvailabilitiesByParticipant | null = null;
    @Prop({required: true})
    participant: Participant;

    monthsRange: Array<IYearMonth> = [];

    beforeMount(): void {
      this.monthsRange = CalendarService.getMonthsRangeForEvent(this.event);
    }
  }

  export default EventCalendarInput;
</script>

<style lang="scss" scoped>
  .event-calendar {
    text-align: center;

    .calendar-item {
      display: inline-block;
      margin: 2rem;
    }
  }
</style>
