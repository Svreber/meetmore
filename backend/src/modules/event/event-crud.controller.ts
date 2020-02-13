import { Controller, Get } from '@nestjs/common';
import {EventCrudService} from './event-crud.service';

@Controller('event/crud')
export class EventCrudController {

  constructor(private readonly eventCrudService: EventCrudService) {
  }

  @Get()
  getHello(): Promise<any[]>   {
    return this.eventCrudService.findAll();
  }
}
