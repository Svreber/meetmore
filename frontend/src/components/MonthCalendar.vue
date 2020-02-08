<template>
  <el-card class="month-calendar">

    <h2 class="title-month">{{yearMonthStr}}</h2>

    <table>
      <tr>
        <td v-for="(day, index) in WEEK_DAYS" :key="index"
            class="day-header">
          {{day}}
        </td>
      </tr>
      <tr v-for="(week, index) in monthCalendar" :key="index">
        <td v-for="(date, index) in week" :key="index">
          <mm-day-of-calendar v-model="internalValue[getDateStr(date)]"
                              :date="date"
                              :month="month">
          </mm-day-of-calendar>
        </td>
      </tr>
    </table>

  </el-card>
</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
  import {Moment} from 'moment';
  import {CalendarService} from '@/core/services/CalendarService';
  import {DateAvailabilities} from '@lib/availability/types';
  import {MonthlyCalendar} from '@/core/interfaces/MonthlyCalendar';

  @Component({
    name: MonthCalendar.tag
  })
  export class MonthCalendar extends Vue {
    static tag = 'mmMonthCalendar';

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

    get yearMonthStr(): string {
      return CalendarService.getYearMonthDate(this.year, this.month)
        .format('MMMM YYYY');
    }
  }

  export default MonthCalendar;
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
  }
</style>
