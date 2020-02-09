import {Injectable} from '@nestjs/common';
import {EventCRUD} from '@meetmore-lib/EventCRUD';
import {EventEntity} from '../event/event.entity';
import {ParticipantEntity} from '../participant/participant.entity';

@Injectable()
export class EntityMapper {
  toEventEntity(view: EventCRUD): EventEntity {
    const entity = new EventEntity();
    entity.name = view.name;
    entity.description = view.description;
    entity.idealRecurrence = view.idealRecurrence;
    entity.participants = view.participants.map(name => this.toParticipantEntity(name));
    entity.availabilities = [];

    return entity
  }

  toParticipantEntity(name: string): ParticipantEntity {
    const entity = new ParticipantEntity();
    entity.name = name;
    return entity;
  }
}
