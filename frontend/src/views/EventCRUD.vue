<template>
  <div class="event-crud">

    <el-card class="box-card">

      Create a new Event

      <el-form ref="form"
               label-width="10rem">

        <el-form-item label="Event name">
          <el-input v-model="event.name"
                    placeholder="Event name">
          </el-input>
        </el-form-item>

        <el-form-item label="Description">
          <el-input v-model="event.description"
                    placeholder="Description"
                    type="textarea">
          </el-input>
        </el-form-item>

        <el-form-item label="Recurrence">
          <el-select v-model="event.idealRecurrence"
                     placeholder="Recurrence">
            <el-option v-for="recurrence in recurrences"
                       :key="recurrence.value"
                       :label="recurrence.name"
                       :value="recurrence.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Participants">

          <el-input v-model="participant"
                    placeholder="Add a participant">
            <el-button icon="el-icon-plus"
                       slot="append"
                       @click="addParticipant()">
            </el-button>
          </el-input>

          <div v-for="(participant, index) in event.participants" :key="index">
            <el-button circle
                       icon="el-icon-delete"
                       size="mini"
                       type="danger"
                       @click="removeParticipant(index)">
            </el-button>
            {{participant}}
          </div>

        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="saveEvent()">Create event</el-button>
        </el-form-item>

      </el-form>

    </el-card>

  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {EventCRUD} from '../../../lib/src/EventCRUD';
  import {IDuration} from '@/core/interfaces/IDuration';
  import {EventService} from '@/core/services/EventService';

  @Component({
    name: EventCRUDComponent.tag
  })
  export class EventCRUDComponent extends Vue {
    static tag = 'mmEventCrud';

    event: EventCRUD = new EventCRUD();

    recurrences: Array<IDuration> = [{
      name: '1 week',
      value: 7
    }, {
      name: '2 weeks',
      value: 14
    }, {
      name: '1 month',
      value: 31
    }, {
      name: '2 months',
      value: 61
    }, {
      name: '6 months',
      value: 183
    }];

    participant: string | null = null;

    mounted(): void {
      this.event.participants = [];
    }

    addParticipant(): void {
      this.event.participants.push(this.participant);
      this.participant = null;
    }

    removeParticipant(index: number): void {
      this.$delete(this.event.participants, index);
      // this.event.participants.splice(index, 1)
    }

    async saveEvent(): void {
      this.event = await EventService.createEvent(this.event);
    }
  }

  export default EventCRUDComponent;
</script>

<style lang="scss" scoped>
  .event-crud {
  }
</style>
