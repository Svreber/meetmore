import {Controller, Get, Param, ParseUUIDPipe} from '@nestjs/common';
import {EventService} from './event.service';
import {Event} from '@meetmore/lib/Event';

@Controller('event')
export class EventController {

  constructor(private readonly eventService: EventService) {
  }

  @Get()
  getAll(): Promise<Array<Event>> {
    return this.eventService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Event> {
    return this.eventService.getOne(id);
  }
}
