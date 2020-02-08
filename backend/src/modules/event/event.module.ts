import {Module} from '@nestjs/common';
import {EventCrudService} from './event-crud.service';
import {EventCrudController} from './event-crud.controller';

@Module({
  controllers: [EventCrudController],
  providers: [EventCrudService]
})
export class EventModule {}
