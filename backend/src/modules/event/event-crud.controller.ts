import {Body, Controller, Get, Post} from '@nestjs/common';
import {EventCrudService} from './event-crud.service';
import {EventCRUD} from '@meetmore-lib/EventCRUD';

@Controller('/event/crud')
export class EventCrudController {

  constructor(private eventCrudService: EventCrudService) {
  }

  @Post()
  async create(@Body() eventCRUD: EventCRUD): Promise<EventCRUD> {
    return this.eventCrudService.save(eventCRUD);
  }

  @Get()
  async getAll(): Promise<Array<EventCRUD>> {
    return this.eventCrudService.getAll();
  }
}
