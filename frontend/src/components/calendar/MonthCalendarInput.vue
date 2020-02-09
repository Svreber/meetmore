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
          <mm-day-calendar-input v-model="internalValue[getDateStr(date)]"
                                 :date="date"
                                 :month="month">
          </mm-day-calendar-input>
        </td>
      </tr>
    </table>

    <div class="buttons-container">
      <el-button @click="markAllAvailabilitiesAsStatus(AvailabilityStatus.PRESENT)">Mark all Present</el-button>
      <el-button @click="markAllAvailabilitiesAsStatus(AvailabilityStatus.ABSENT)">Mark all Absent</el-button>
    </div>

  </el-card>
</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
  import {Moment} from 'moment';
  import {CalendarService} from '../../core/services/CalendarService';
  import {DateAvailabilities} from '../../../../lib/src/availability/types';
  import {MonthlyCalendar} from '../../core/interfaces/MonthlyCalendar';

  // import {AvailabilityStatus} from '@lib/availability/AvailabilityStatus';
  enum AvailabilityStatus {
    PRESENT = 'present',
    ABSENT = 'absent',
    NO_REPLY = 'no_reply'
  } // FIXME

  @Component({
    name: MonthCalendarInput.tag
  })
  export class MonthCalendarInput extends Vue {
    static tag = 'mmMonthCalendarInput';

    readonly AvailabilityStatus = AvailabilityStatus;
    readonly WEEK_DAYS = CalendarService.WEEK_DAYS;

    @Prop({required: true})
    month: number;
    @Prop({required: true})
    value: DateAvailabilities | null;
    @Prop({required: true})
    year: number;

    monthCalendar: MonthlyCalendar | null = null;
    internalValue: DateAvailabilities | null = null;

    beforeMount(): void {
      this.monthCalendar = CalendarService.buildMonthCalendar(this.year, this.month);
      this.onValueChanged();
    }

    @Watch('value')
    onValueChanged(): void {
      this.internalValue = this.value || {};
      CalendarService.initializeAvailabilities(this.internalValue, this.monthCalendar);
    }

    onInternalValueChanged(): void {
      this.$emit('input', this.internalValue);
    }

    getDateStr(date: Moment): string {
      return CalendarService.getDateStr(date);
    }

    get calendarTitle(): string {
      return CalendarService.getYearMonthDate(this.year, this.month)
        .format('MMMM YYYY');
    }

    markAllAvailabilitiesAsStatus(newStatus: AvailabilityStatus): void {
      CalendarService.markAllAvailabilitiesAsStatus(this.internalValue, this.year, this.month, newStatus);
    }
  }

  export default MonthCalendarInput;
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

    .buttons-container {
      margin-top: 1.5rem;
    }
  }
</style>
