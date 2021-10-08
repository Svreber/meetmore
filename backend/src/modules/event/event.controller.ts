import {Body, Controller, Get, Param, ParseUUIDPipe, Put} from '@nestjs/common';
import {EventService} from './event.service';
import {Event, EventAvailabilitiesByParticipant, DateAvailabilities} from '@meetmore/lib';

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

  @Get(':eventId/participant/:participantId')
  get(@Param('eventId', new ParseUUIDPipe()) eventId: string,
      @Param('participantId', new ParseUUIDPipe()) participantId: string): Promise<EventAvailabilitiesByParticipant> {
    //return this.eventService.getAvailabilitiesByParticipant(eventId, participantId);
    return null;
  }

  @Put(':eventId/participant/:participantId')
  update(@Param('eventId', new ParseUUIDPipe()) eventId: string,
         @Param('participantId', new ParseUUIDPipe()) participantId: string,
         @Body() dateAvailabilities: DateAvailabilities): Promise<EventAvailabilitiesByParticipant> {

    //return this.eventService.eraseAvailabilitiesBy(eventId, participantId, dateAvailabilities);
    return null;
  }
}
