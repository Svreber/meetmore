<template>
  <div class="day-of-calendar"
       :class="{'current-month': isCurrentMonth(),
                'present': internalValue.status === AvailabilityStatus.PRESENT,
                'past': isInPast(),
                'today': isToday()}"
       @click="toggleDate()">
    {{date.date()}}
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
  import {Moment} from 'moment';
  import {DateAvailability} from '../../../../lib/src/availability/DateAvailability';
  // import {AvailabilityStatus} from '@lib/availability/AvailabilityStatus';
  enum AvailabilityStatus {
    PRESENT = 'present',
    ABSENT = 'absent',
    NO_REPLY = 'no_reply'
  } // FIXME

  @Component({
    name: DayCalendarInput.tag
  })
  export class DayCalendarInput extends Vue {
    static tag = 'mmDayCalendarInput';

    readonly AvailabilityStatus = AvailabilityStatus;

    @Prop({required: true})
    date: Moment;
    @Prop({required: true})
    month: number;
    @Prop({required: true})
    value: DateAvailability | null;

    internalValue: DateAvailability | null = null;

    beforeMount(): void {
      this.onValueChanged();
    }

    @Watch('value')
    onValueChanged(): void {
      this.internalValue = this.value;
    }

    onInternalValueChanged(): void {
      this.$emit('input', this.internalValue);
    }

    isCurrentMonth(): boolean {
      return this.date.month() === this.month;
    }

    isInPast(): boolean {
      return this.date.isBefore(new Date(), 'day');
    }

    isToday(): boolean {
      return this.date.isSame(new Date(), 'day');
    }

    toggleDate(): void {
      if (!this.isInPast()) {
        this.internalValue.status = this.internalValue.status === AvailabilityStatus.PRESENT
          ? AvailabilityStatus.ABSENT
          : AvailabilityStatus.PRESENT;
        this.onInternalValueChanged();
      }
    }
  }

  export default DayCalendarInput;
</script>

<style lang="scss" scoped>
  .day-of-calendar {
    align-items: center;
    border-radius: 1.5rem;
    display: flex;
    height: 3rem;
    justify-content: center;
    text-align: center;
    user-select: none;
    width: 3rem;

    &:not(.past):hover {
      opacity: 0.8;
    }
  }

  .day-of-calendar:not(.current-month) {
    color: white;
    opacity: 0.5;

    &:not(.past):hover {
      opacity: 0.3;
    }
  }

  .day-of-calendar:not(.past) {
    cursor: pointer;
  }

  .present {
    background-color: #66CC66;
    color: black;
  }

  .day-of-calendar:not(.present) {
    background-color: #cca09f;
  }

  .today.current-month {
    border: 1px solid black;
  }
  
  .past {
    cursor: not-allowed;
    text-decoration: line-through;
  }
</style>
