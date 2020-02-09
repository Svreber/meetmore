import {Controller, Get, Param, ParseUUIDPipe} from '@nestjs/common';
import {EventService} from './event.service';
import {Event} from '@meetmore-lib/Event';
import {EventAvailabilitiesByParticipant} from '@meetmore-lib/availability/EventAvailabilitiesByParticipant';

@Controller('/event')
export class EventController {

  constructor(private readonly eventService: EventService) {
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
}
