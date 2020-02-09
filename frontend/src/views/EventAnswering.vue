<template>
  <div class="event-answering">

    <template v-if="event">

      <el-card>

        <h2>{{event.name}}</h2>

        <div>{{event.description}}</div>

        <el-button type="primary"
                   @click="saveAvailabilities()">
          Save
        </el-button>

      </el-card>

      <mm-event-calendar-input :event="event"
                               :eventAvailabilities="eventAvailabilities"
                               :participant="participant">
      </mm-event-calendar-input>

    </template>

  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {Event} from '../../../lib/src/Event';
  import {RouterService} from '@/core/services/RouterService';
  import {EventService} from '@/core/services/EventService';
  import {Participant} from '@lib/Participant';
  import {EventAvailabilitiesByParticipant} from '@lib/availability/EventAvailabilitiesByParticipant';

  @Component()
  export class EventAnswering extends Vue {

    event: Event | null = null;
    eventAvailabilities: EventAvailabilitiesByParticipant | null = null;
    participant: Participant | null = null;

    async mounted(): Promise<void> {
      const eventId = this.$route.params.eventId;
      const participantId = this.$route.params.participantId;

      if (eventId) {
        try {
          this.event = await EventService.getEvent(eventId);
          this.participant = this.event.participants.find(participant => participant.id = participantId);
          if (!this.participant) {
            // TODO Error handling
            RouterService.goToEventView(this.event.id);
          }

          this.eventAvailabilities = await EventService.getEventAvailabilitiesForParticipant(this.event.id, this.participant.id);
        } catch {
          // TODO Error message
        }
      } else {
        RouterService.goToHome();
      }
    }

    async saveAvailabilities(): Promise<void> {
      try {
        await EventService.saveEventAvailabilitiesForParticipant(this.event.id, this.participant.id, this.eventAvailabilities.availabilities);
        // TODO: Success message
      } catch {
        // TODO: Error handling
      }
    }
  }

  export default EventAnswering;
</script>

<style lang="scss" scoped>
  .event-answering {

    .calendar-item {
      display: inline-block;
      margin: 2rem;
    }
  }
</style>
