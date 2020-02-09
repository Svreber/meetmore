<template>
  <div class="event-answering">

    <template v-if="event">

      <el-card>

        <h2>{{event.name}}</h2>

        <div>{{event.description}}</div>

        <el-button v-for="participant in event.participants" :key="participant.id"
                   @click="answerEvent(participant)">
          {{participant.name}}
        </el-button>

      </el-card>

      <mm-event-calendar-results :event="event"></mm-event-calendar-results>

    </template>

  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {Event} from '../../../lib/src/Event';
  import {RouterService} from '@/core/services/RouterService';
  import {EventService} from '@/core/services/EventService';
  import {Participant} from '@lib/Participant';

  @Component()
  export class EventView extends Vue {

    event: Event | null = null;

    async mounted(): Promise<void> {
      const eventId = this.$route.params.id;

      if (eventId) {
        try {
          this.event = await EventService.getEvent(eventId);
        } catch {
          // TODO: Error handling
        }
      } else {
        RouterService.goToHome();
      }
    }

    answerEvent(participant: Participant): void {
      RouterService.goToEventAnswering(this.event.id, participant.id);
    }
  }

  export default EventView;
</script>

<style lang="scss" scoped>
  .event-answering {
  }
</style>
