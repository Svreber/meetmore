import {Body, Controller, Get, Param, ParseUUIDPipe, Post, Put} from '@nestjs/common';
import {EventCrudService} from './event-crud.service';
import {EventCRUD} from '@meetmore-lib/EventCRUD';

@Controller('/event/crud')
export class EventCrudController {

  constructor(private readonly eventCrudService: EventCrudService) {
  }

  @Post()
  create(@Body() eventCRUD: EventCRUD): Promise<EventCRUD> {
    return this.eventCrudService.save(eventCRUD);
  }

  @Put()
  update(@Body() eventCRUD: EventCRUD): Promise<EventCRUD> {
    return this.eventCrudService.update(eventCRUD);
  }

  @Get(':id')
  getOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<EventCRUD> {
    return this.eventCrudService.getOne(id);
  }

  @Get()
  getAll(): Promise<Array<EventCRUD>> {
    return this.eventCrudService.getAll();
  }
}
