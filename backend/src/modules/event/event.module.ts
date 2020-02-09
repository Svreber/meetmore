import {Module} from '@nestjs/common';
import {EventCrudService} from './event-crud.service';
import {EventCrudController} from './event-crud.controller';
import {EventController} from './event.controller';
import {EventService} from './event.service';

@Module({
  controllers: [EventController, EventCrudController],
  providers: [EventService, EventCrudService]
})
export class EventModule {}
