import {Injectable} from '@nestjs/common';
import {EventCRUD} from '@meetmore-lib/EventCRUD';
import {Event} from '@meetmore-lib/Event';
import {Participant} from '@meetmore-lib/Participant';
import * as uuid from 'uuid';

@Injectable()
export class EventMapper {

  toEvent(eventCRUD: EventCRUD): Event {
    const event = new Event();
    event.id = eventCRUD.id || uuid.v4();
    event.name = eventCRUD.name;
    event.description = eventCRUD.description;
    event.idealRecurrence = eventCRUD.idealRecurrence;

    event.participants = eventCRUD.participants.map(name => {
      // TODO: Retrieve correct participant
      const participant = new Participant();
      participant.id = uuid.v4();
      participant.name = name;
      return participant;
    });

    return event;
  }

  toEventCRUD(event: Event): EventCRUD {
    const eventCRUD = new EventCRUD();
    eventCRUD.id = event.id;
    eventCRUD.name = event.name;
    eventCRUD.description = event.description;
    eventCRUD.idealRecurrence = event.idealRecurrence;

    eventCRUD.participants = event.participants.map(participant => participant.name);

    return eventCRUD;
  }
}