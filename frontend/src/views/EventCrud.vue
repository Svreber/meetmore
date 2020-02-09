<template>
  <div class="event-crud">

    <el-card class="event-crud-card">

      <h2 v-if="!event.id"
          class="title">
        Create a new event
      </h2>
      <h2 v-if="event.id"
          class="title">
        Edit your event
      </h2>

      <el-form ref="form"
               label-width="7rem">

        <el-form-item label="Event name"
                      :required="true">
          <el-input v-model="event.name"
                    placeholder="Event name"
                    @input="validate">
          </el-input>
        </el-form-item>

        <el-form-item label="Description">
          <el-input v-model="event.description"
                    :autosize="{minRows: 3, maxRows: 8}"
                    placeholder="Description"
                    type="textarea"
                    @input="validate">
          </el-input>
        </el-form-item>

        <el-form-item label="Recurrence"
                      :required="true">
          <mm-select-recurrence v-model="event.idealRecurrence"
                                @input="validate">
          </mm-select-recurrence>
        </el-form-item>

        <el-form-item label="Participants"
                      :required="true">
          <mm-select-participants v-model="event.participants"
                                  @input="validate">
          </mm-select-participants>
        </el-form-item>

        <el-form-item>
          <el-button v-if="!event.id"
                     :disabled="!isValid"
                     type="primary"
                     @click="saveEvent()">
            Create an event
          </el-button>
          <el-button v-if="event.id"
                     :disabled="!isValid"
                     @click="updateEvent()">
            Update this event
          </el-button>
          <el-button v-if="event.id"
                     type="primary"
                     @click="viewEvent()">
            View this event
          </el-button>
        </el-form-item>

      </el-form>

    </el-card>

  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {EventCRUD} from '../../../lib/src/EventCRUD';
  import {EventCrudService} from '@/core/services/EventCrudService';
  import {RouterService} from '@/core/services/RouterService';
  import {validate, ValidationError} from 'class-validator';

  @Component()
  export class EventCrud extends Vue {

    errors: Array<ValidationError> = [];
    event: EventCRUD | null = null;

    async created(): Promise<void> {
      const eventId = this.$route.params.id;

      if (eventId) {
        try {
          this.event = await EventCrudService.getEvent(eventId);
        } catch {
          // TODO Error handling
        }
      } else {
        this.event = new EventCRUD();
      }

      this.validate();
    }

    async validate(): Promise<void> {
      this.errors = await validate(this.event);
    }

    get isValid(): boolean {
      return this.errors.length === 0;
    }

    async saveEvent(): Promise<void> {
      try {
        this.event = await EventCrudService.createEvent(this.event);
        RouterService.goToEventEdition(this.event.id);
      } catch {
        // TODO Error handling
      }
    }

    async updateEvent(): Promise<void> {
      try {
        this.event = await EventCrudService.updateEvent(this.event);
      } catch {
        // TODO Error handling
      }
    }

    viewEvent(): void {
      RouterService.goToEventView(this.event.id);
    }
  }

  export default EventCrud;
</script>

<style lang="scss" scoped>
  .event-crud {

    .title {
      margin-bottom: 3rem;
    }

    .event-crud-card {
      margin: auto;
      max-width: 35rem;
    }

    .participants {
      margin-top: .5rem;
    }

    .remove-participant {
      margin-right: .5rem;
    }
  }
</style>
