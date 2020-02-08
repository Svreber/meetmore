<template>
  <div class="event-crud">

    <el-card class="box-card event-crud-card">

      <h2 class="title">Create a new Event</h2>

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
          <el-button :disabled="!isValid"
                     type="primary"
                     @click="saveEvent()">
            Create event
          </el-button>
        </el-form-item>

      </el-form>

    </el-card>

  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {EventCRUD} from '../../../lib/src/EventCRUD';
  import {EventService} from '@/core/services/EventService';
  import {RouterService} from '@/core/services/RouterService';
  import {validate, ValidationError} from 'class-validator';

  @Component()
  export class EventCRUDComponent extends Vue {

    errors: Array<ValidationError> = [];
    event: EventCRUD | null = null;

    async mounted(): void {
      const eventId = this.$route.params.id;

      if (eventId) {
        this.event = await EventService.getEvent(eventId);
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

    async isValid(): Promise<boolean> {
      const errors = await validate(this.event);
      return errors.length === 0;
    }

    async saveEvent(): void {
      this.event = await EventService.createEvent(this.event);
      RouterService.goToEventEdition(this.event.id);
    }
  }

  export default EventCRUDComponent;
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
