<template>
  <div class="event-calendar">
    <mm-month-calendar-results v-for="(yearMonth, index) in monthsRange" :key="index"
                               :event="event"
                               class="calendar-item"
                               :month="yearMonth.month"
                               :year="yearMonth.year">
    </mm-month-calendar-results>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {CalendarService} from '../../core/services/CalendarService';
  import {Event} from '../../../../lib/src/Event';
  import {IYearMonth} from '../../core/interfaces/IYearMonth';

  @Component({
    name: EventCalendarResults.tag
  })
  export class EventCalendarResults extends Vue {
    static tag = 'mmEventCalendarResults';

    @Prop({required: true})
    event: Event;

    monthsRange: Array<IYearMonth> = [];

    mounted(): void {
      this.monthsRange = CalendarService.getMonthsRangeForEvent(this.event);
    }
  }

  export default EventCalendarResults;
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
