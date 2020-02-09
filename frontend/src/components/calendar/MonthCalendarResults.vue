<template>
  <el-card class="month-calendar">

    <h2 class="title-month">{{calendarTitle}}</h2>

    <table>
      <tr>
        <td v-for="(day, index) in WEEK_DAYS" :key="index"
            class="day-header">
          {{day}}
        </td>
      </tr>
      <tr v-for="(week, index) in monthCalendar" :key="index">
        <td v-for="(date, index) in week" :key="index">
          <mm-day-calendar-results :availabilities="event.availabilities[getDateStr(date)]"
                                   :date="date"
                                   :month="month"
                                   :participants="event.participants">
          </mm-day-calendar-results>
        </td>
      </tr>
    </table>

    <div class="participant-tags">
      <mm-participant-tag v-for="participant in event.participants" :key="participant.id"
                          class="participant-tag"
                          :participant="participant"
                          :status="getAnswerRate(participant) === 1 ? 'present' : 'no_reply'">
      </mm-participant-tag>
    </div>

  </el-card>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {Moment} from 'moment';
  import {CalendarService} from '../../core/services/CalendarService';
  import {MonthlyCalendar} from '../../core/interfaces/MonthlyCalendar';
  import {Event} from '../../../../lib/src/Event';
  import {Participant} from '../../../../lib/src/Participant';

  @Component({
    name: MonthCalendarResults.tag
  })
  export class MonthCalendarResults extends Vue {
    static tag = 'mmMonthCalendarResults';

    readonly WEEK_DAYS = CalendarService.WEEK_DAYS;

    @Prop({required: true})
    event: Event;
    @Prop({required: true})
    month: number;
    @Prop({required: true})
    year: number;

    monthCalendar: MonthlyCalendar | null = null;

    beforeMount(): void {
      this.monthCalendar = CalendarService.buildMonthCalendar(this.year, this.month);
    }

    getDateStr(date: Moment): string {
      return CalendarService.getDateStr(date);
    }

    get calendarTitle(): string {
      return CalendarService.getYearMonthDate(this.year, this.month)
        .format('MMMM YYYY');
    }

    getAnswerRate(participant: Participant): number {
      return CalendarService.getAnswerRate(this.month, this.year, participant, this.event.availabilities);
    }
  }

  export default MonthCalendarResults;
</script>

<style lang="scss" scoped>
  .month-calendar {

    .title-month {
      text-align: center;
    }

    .day-header {
      font-size: .8rem;
      padding: .8rem;
      text-align: center;
    }

    .participant-tags {
      margin-top: 1.5rem;
    }

    .participant-tag {
      margin: .5rem;
    }
  }
</style>
