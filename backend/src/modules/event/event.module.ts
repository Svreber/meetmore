import {Module} from '@nestjs/common';
import {EventCrudService} from './event-crud.service';
import {EventCrudController} from './event-crud.controller';
import {EventMapper} from './event.mapper';

@Module({
  controllers: [EventCrudController],
  providers: [EventCrudService, EventMapper]
})
export class EventModule {}
