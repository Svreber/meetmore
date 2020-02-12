import {Body, Controller, Get, Param, ParseUUIDPipe, Put} from '@nestjs/common';
import {EventService} from './event.service';
import {Event} from '@meetmore-lib/Event';
import {EventAvailabilitiesByParticipant} from '@meetmore-lib/availability/EventAvailabilitiesByParticipant';
import {DateAvailabilities} from '@meetmore-lib/availability/types';

@Controller('/event')
export class EventController {

  constructor(private readonly eventService: EventService) {
  }

  @Get(':id')
  getOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Event> {
    return this.eventService.getOne(id);
  }

  @Get()
  getAll(): Promise<Array<Event>> {
    return this.eventService.getAll();
  }

  @Get(':eventId/participant/:participantId')
  get(@Param('eventId', new ParseUUIDPipe()) eventId: string,
      @Param('participantId', new ParseUUIDPipe()) participantId: string): Promise<EventAvailabilitiesByParticipant> {
    return this.eventService.getAvailabilitiesByParticipant(eventId, participantId);
  }

  @Put(':eventId/participant/:participantId')
  update(@Param('eventId', new ParseUUIDPipe()) eventId: string,
         @Param('participantId', new ParseUUIDPipe()) participantId: string,
         @Body() dateAvailabilities: DateAvailabilities): Promise<EventAvailabilitiesByParticipant> {

    return this.eventService.eraseAvailabilitiesBy(eventId, participantId, dateAvailabilities);
  }
}
