import moment, {Moment} from 'moment';
import {DateAvailabilities, ParticipantsAvailabilities} from '@lib/availability/types';
import {MonthlyCalendar, WeeklyCalendar} from '@/core/interfaces/MonthlyCalendar';
import {Event} from '@lib/Event';
import {IYearMonth} from '@/core/interfaces/IYearMonth';
import {Participant} from '@lib/Participant';
// import {AvailabilityStatus} from '@lib/availability/AvailabilityStatus';
enum AvailabilityStatus {
  PRESENT = 'present',
  ABSENT = 'absent',
  NO_REPLY = 'no_reply'
} // FIXME

export class CalendarService {

  static WEEK_DAYS: Array<string> = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  static HORIZON_FACTOR: number = 2;

  private constructor() {
  }

  static getMonthsRangeForEvent(event: Event): Array<IYearMonth> {
    const currentDate = moment();
    const maxDate = currentDate.clone().add(this.HORIZON_FACTOR * event.idealRecurrence, 'days');

    const range: Array<IYearMonth> = [];
    while (currentDate.year() < maxDate.year() || currentDate.month() <= maxDate.month()) {
      range.push({
        month: currentDate.month(),
        year: currentDate.year()
      });
      currentDate.add(1, 'month')
    }

    return range;
  }

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

  static getFirstDateForMonthlyCalendar(year: number, month: number): Moment {
    return this.getYearMonthDate(year, month)
      .startOf('month')
      .startOf('isoWeek');
  }

  static getAllDatesInMonth(year: number, month: number): Array<Moment> {
    const currentDay = this.getYearMonthDate(year, month)
      .startOf('month');

    const allDatesInMonth: Array<Moment> = [];
    while (currentDay.month() === month) {
      allDatesInMonth.push(currentDay.clone());
      currentDay.add(1, 'day');
    }

    return allDatesInMonth;
  }

  static initializeAvailabilities(availabilities: DateAvailabilities, monthCalendar: MonthlyCalendar): void {
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

  static getAnswerRate(month: number, year: number, participant: Participant, participantsAvailabilities: ParticipantsAvailabilities): number {
    const allDatesInMonth = this.getAllDatesInMonth(year, month);

    const participantAnswers = allDatesInMonth.filter(date => {
      const dateAvailabilities = participantsAvailabilities[this.getDateStr(date)];
      if (!dateAvailabilities) return false;

      const availability = dateAvailabilities.find(participantAvailabilities => participantAvailabilities.participant.id === participant.id);
      return availability && (availability.status === AvailabilityStatus.PRESENT || availability.status === AvailabilityStatus.ABSENT);
    });

    return participantAnswers.length / allDatesInMonth.length;
  }

  static markAllAvailabilitiesAsStatus(availabilities: DateAvailabilities, year: number, month: number, newStatus: AvailabilityStatus): void {
    Object.values(availabilities)
      .forEach(availability => {
        const availabilityDate = moment(availability.date);
        if (availabilityDate.year() === year && availabilityDate.month() === month) {
          availability.status = newStatus;
        }
      });
  }
}
