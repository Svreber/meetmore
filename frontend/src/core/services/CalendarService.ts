import moment, {Moment} from 'moment';
import {DateAvailabilities} from '@lib/availability/types';
import {MonthlyCalendar, WeeklyCalendar} from '@/core/interfaces/MonthlyCalendar';
// import {AvailabilityStatus} from '@lib/availability/AvailabilityStatus';
enum AvailabilityStatus {
  PRESENT = 'present',
  ABSENT = 'absent',
  NO_REPLY = 'no_reply'
} // FIXME

export class CalendarService {

  static WEEK_DAYS: Array<string> = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  private constructor() {
  }

  // static buildMonthCalendar(year: number, month: number): MonthlyCalendar {
  //   const currentDay = this.getFirstDateForMonthlyCalendar(year, month);
  //
  //   const dates: Array<Array<Moment>> = [];
  //   while (currentDay.year() < year || currentDay.month() <= month) {
  //     dates.push(this.WEEK_DAYS.reduce(week => {
  //       week.push(currentDay.clone());
  //       currentDay.add(1, 'days');
  //       return week;
  //     }, [] as Array<Moment>));
  //   }
  //
  //   return dates;
  // }

  static buildMonthCalendar(year: number, month: number): MonthlyCalendar {
    const currentDay = this.getFirstDateForMonthlyCalendar(year, month);

    const dates: MonthlyCalendar = [];
    for (let i = 0; i < 6; ++i) {
      dates.push(this.WEEK_DAYS.reduce(week => {
        week.push(currentDay.clone());
        currentDay.add(1, 'days');
        return week;
      }, [] as WeeklyCalendar));
    }

    return dates;
  }

  static getYearMonthDate(year: number, month: number): Moment {
    return moment({year, month});
  }

  static getFirstDateForMonthlyCalendar(year: number, month: number) {
    return this.getYearMonthDate(year, month)
      .startOf('month')
      .startOf('isoWeek');
  }

  static initializeAvailabilities(availabilities: DateAvailabilities, monthCalendar: MonthlyCalendar) {
    monthCalendar.forEach(week => week.forEach(date => this.createValueEntry(availabilities, date)));
  }

  static createValueEntry(availabilities: DateAvailabilities, date: Moment): void {
    const dateStr = this.getDateStr(date);
    availabilities[dateStr] = availabilities[dateStr] || {
      date: dateStr,
      status: AvailabilityStatus.ABSENT
    }
  }

  static getDateStr(date: Moment): string {
    return date.format('YYYY-MM-DD');
  }
}
