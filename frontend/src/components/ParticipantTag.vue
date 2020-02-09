<template>
  <el-tag class="participant-tag"
          :type="tagType">
    <i :class="iconClass"></i> {{participant.name}}
  </el-tag>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {Participant} from '@lib/Participant';

  // import {AvailabilityStatus} from '@lib/availability/AvailabilityStatus';
  enum AvailabilityStatus {
    PRESENT = 'present',
    ABSENT = 'absent',
    NO_REPLY = 'no_reply'
  } // FIXME

  @Component({
    name: ParticipantTag.tag
  })
  export class ParticipantTag extends Vue {
    static tag = 'mmParticipantTag';

    readonly AvailabilityStatus = AvailabilityStatus;

    @Prop({required: true})
    participant: Participant;
    @Prop({required: true})
    status: AvailabilityStatus; // FIXME

    get tagType(): string {
      switch (this.status) {
        case AvailabilityStatus.ABSENT:
          return 'danger';
        case AvailabilityStatus.PRESENT:
          return 'success';
        default:
          return 'info';
      }
    }

    get iconClass(): string {
      switch (this.status) {
        case AvailabilityStatus.ABSENT:
          return 'el-icon-error';
        case AvailabilityStatus.PRESENT:
          return 'el-icon-check';
        default:
          return 'el-icon-question';
      }
    }
  }

  export default ParticipantTag;
</script>
