import {Injectable} from '@nestjs/common';
import {EventCRUD} from '@meetmore-lib/EventCRUD';
import {Event} from '@meetmore-lib/Event';
import {Participant} from '@meetmore-lib/Participant';
import * as uuid from 'uuid';
import {EventEntity} from '../../infrastructure/event/event.entity';

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

  toEventEntity(eventCRUD: EventCRUD): EventEntity {
    const eventEntity = new EventEntity();
    eventEntity.id = eventCRUD.id || uuid.v4();
    eventEntity.name = eventCRUD.name;
    eventEntity.description = eventCRUD.description;
    eventEntity.idealRecurrence = eventCRUD.idealRecurrence;

    // event.participants = eventCRUD.participants.map(name => {
    //   // TODO: Retrieve correct participant
    //   const participant = new Participant();
    //   participant.id = uuid.v4();
    //   participant.name = name;
    //   return participant;
    // });

    return eventEntity
  }

  toEventCRUD(eventEntity: EventEntity): EventCRUD {
    const eventCRUD = new EventCRUD();
    eventCRUD.id = eventEntity.id;
    eventCRUD.name = eventEntity.name;
    eventCRUD.description = eventEntity.description;
    eventCRUD.idealRecurrence = eventEntity.idealRecurrence;
    eventCRUD.participants = ['emptyYet'];
    // eventCRUD.participants = event.participants.map(participant => participant.name);

    return eventCRUD;
  }
}