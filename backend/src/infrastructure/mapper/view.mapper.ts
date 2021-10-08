import {Injectable} from '@nestjs/common';
import { EventEntity } from '../event/event.entitiy';
import {throwIfUndefined} from '../../core/utils';
import {ParticipantEntity} from '../participant/participant.entity';
import { EventCRUD, Event, Participant } from '@meetmore/lib';

@Injectable()
export class ViewMapper {

  toEventCRUD(entity: EventEntity): EventCRUD {
    throwIfUndefined(entity.participants, new Error('evententity.participants is undefined'));
    const view = new EventCRUD();
    view.id = entity.id;
    view.name = entity.name;
    view.description = entity.description;
    view.idealRecurrence = entity.idealRecurrence;
    // FIXME: Make it option on participants field ?
    view.participants = entity.participants.map(participantEntity => participantEntity.name);

    return view;
  }

  toEvent(entity: EventEntity): Event {
    const view = new Event();
    view.id = entity.id;
    view.name = entity.name;
    view.description = entity.description;
    view.idealRecurrence = entity.idealRecurrence;
    view.participants = entity.participants.map(entity => this.toParticipant(entity));
    view.availabilities = {};
    return view;
  }

  toParticipant(entity: ParticipantEntity): Participant {
    const view = new Participant();
    view.id = entity.id;
    view.name = entity.name;
    return view;
  }
}
