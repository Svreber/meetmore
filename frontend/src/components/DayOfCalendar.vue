<template>
  <div class="day-of-calendar"
       :class="{'current-month': isCurrentMonth(), 'present': internalValue.status === AvailabilityStatus.PRESENT}"
       @click="toggleDate()">
    {{date.date()}}
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
  import {Moment} from 'moment';
  import {DateAvailability} from '@lib/availability/DateAvailability';
  // import {AvailabilityStatus} from '@lib/availability/AvailabilityStatus';
  enum AvailabilityStatus {
    PRESENT = 'present',
    ABSENT = 'absent',
    NO_REPLY = 'no_reply'
  } // FIXME

  @Component({
    name: DayOfCalendar.tag
  })
  export class DayOfCalendar extends Vue {
    static tag = 'mmDayOfCalendar';

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

    toggleDate(): void {
      this.internalValue.status = this.internalValue.status === AvailabilityStatus.PRESENT
        ? AvailabilityStatus.ABSENT
        : AvailabilityStatus.PRESENT;
      this.onInternalValueChanged();
    }
  }

  export default DayOfCalendar;
</script>

<style lang="scss" scoped>
  .day-of-calendar {
    border-radius: .4rem;
    cursor: pointer;
    padding: .8rem;
    text-align: center;
    user-select: none;
  }

  .day-of-calendar:hover {
    background-color: #BBDDBB;
  }

  .day-of-calendar:not(.current-month) {
    color: #CCC;
  }

  .present.current-month {
    background-color: #66CC66;
    color: black;
  }

  .present:not(.current-month) {
    background-color: #BBDDBB;
    color: white;
  }
</style>
