<template>
  <el-popover :enterable="false"
              :open-delay="300"
              placement="top"
              trigger="hover">

    <mm-participant-tag v-for="participant in participants" :key="participant.id"
                        class="participant-tag"
                        :participant="participant"
                        :status="getParticipantStatus(participant)">
    </mm-participant-tag>

    <div class="day-of-calendar"
         :class="{'current-month': isCurrentMonth(),
                  'full-presence': presenceRate === 1,
                  'some-absence': presenceRate < 1 && absenceRate > 0,
                  'undetermined': presenceRate > 0 && presenceRate < 1 && absenceRate === 0,
                  'today': isToday()}"
         slot="reference">
      {{date.date()}}
    </div>

  </el-popover>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {Moment} from 'moment';
  import {ParticipantAvailability} from '../../../../lib/src/availability/ParticipantAvailability';
  import {Participant} from '../../../../lib/src/Participant';

  // import {AvailabilityStatus} from '@lib/availability/AvailabilityStatus';
  enum AvailabilityStatus {
    PRESENT = 'present',
    ABSENT = 'absent',
    NO_REPLY = 'no_reply'
  } // FIXME

  @Component({
    name: DayCalendarResults.tag
  })
  export class DayCalendarResults extends Vue {
    static tag = 'mmDayCalendarResults';

    @Prop({required: true})
    date: Moment;
    @Prop({required: true})
    month: number;
    @Prop({default: () => []})
    availabilities: Array<ParticipantAvailability>;
    @Prop({required: true})
    participants: Array<Participant>;

    isCurrentMonth(): boolean {
      return this.date.month() === this.month;
    }

    isToday(): boolean {
      return this.date.isSame(new Date(), 'day');
    }

    get presenceRate(): number {
      return this.availabilities
        .filter(availability => availability.status === AvailabilityStatus.PRESENT)
        .length / this.participants.length;
    }

    get absenceRate(): number {
      return this.availabilities
        .filter(availability => availability.status === AvailabilityStatus.ABSENT)
        .length / this.participants.length;
    }

    getParticipantStatus(participant: Participant): AvailabilityStatus {
      const availability = this.availabilities.find(availability => availability.participant.id === participant.id);
      return availability ? availability.status : AvailabilityStatus.NO_REPLY;
    }
  }

  export default DayCalendarResults;
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

    &:hover {
      opacity: 0.8;
    }
  }

  .day-of-calendar:not(.current-month) {
    opacity: 0.5;

    &:hover {
      opacity: 0.3;
    }
  }

  .full-presence {
    background-color: #66CC66;
    color: black;
  }

  .some-absence {
    background-color: #cc8080;
    color: black;
  }

  .undetermined {
    background-color: #EEEEEE;
  }

  .full-presence:not(.current-month),
  .some-absence:not(.current-month) {
    color: white;
  }

  .today {
    border: 1px solid black;
  }

  .participant-tag {
    display: block;
    margin: .5rem;
  }
</style>
