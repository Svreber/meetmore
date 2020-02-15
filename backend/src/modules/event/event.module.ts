import {Module} from '@nestjs/common';
import {EventController} from './event.controller';
import {EventService} from './event.service';
import {EventCrudController} from './event-crud.controller';
import {EventCrudService} from './event-crud.service';
import {ParticipantModule} from '../participant/participant.module';

@Module({
  imports: [ParticipantModule],
  controllers: [EventController, EventCrudController],
  providers: [EventService, EventCrudService]
})
export class EventModule {}
