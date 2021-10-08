import {Injectable} from '@nestjs/common';
import {EventEntity} from '../event/event.entitiy';
import {ParticipantEntity} from '../participant/participant.entity';
import { EventCRUD } from '@meetmore/lib';

@Injectable()
export class EntityMapper {

  toEventEntity(view: EventCRUD, participants: Array<ParticipantEntity>): EventEntity {
    const entity = new EventEntity();
    entity.id = view.id;
    entity.name = view.name;
    entity.description = view.description;
    entity.idealRecurrence = view.idealRecurrence;
    entity.participants = participants;
    //entity.availabilities = [];

    return entity
  }

  toParticipantEntity(name: string): ParticipantEntity {
    const entity = new ParticipantEntity();
    entity.name = name;
    return entity;
  }
}
