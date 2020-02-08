import {Injectable} from '@nestjs/common';
import {EventCRUD} from '@meetmore-lib/EventCRUD';
import {EventEntity} from '../event/event.entity';
import {ParticipantMapper} from './participant.mapper';

@Injectable()
export class EventMapper {

  constructor(private readonly participantMapper: ParticipantMapper) {
  }

  toEntity(eventCRUD: EventCRUD): EventEntity {
    const eventEntity = new EventEntity();
    eventEntity.name = eventCRUD.name;
    eventEntity.description = eventCRUD.description;
    eventEntity.idealRecurrence = eventCRUD.idealRecurrence;
    eventEntity.participants = eventCRUD.participants.map(name => this.participantMapper.toEntity(name));

    return eventEntity
  }

  toCRUD(eventEntity: EventEntity): EventCRUD {
    const eventCRUD = new EventCRUD();
    eventCRUD.id = eventEntity.id;
    eventCRUD.name = eventEntity.name;
    eventCRUD.description = eventEntity.description;
    eventCRUD.idealRecurrence = eventEntity.idealRecurrence;
    eventCRUD.participants = eventEntity.participants.map(participant => participant.name);

    return eventCRUD;
  }
}
