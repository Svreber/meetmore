import {Injectable} from '@nestjs/common';
import {EventCRUD} from '@meetmore/lib/EventCRUD';
import {EventEntity} from '../event/event.entitiy';

@Injectable()
export class EntityMapper {

  toEventEntity(view: EventCRUD): EventEntity {
    const entity = new EventEntity();
    // @ts-ignore
    entity.id = view.id;
    entity.name = view.name;
    entity.description = view.description;
    entity.idealRecurrence = view.idealRecurrence;
    //entity.participants = view.participants.map(name => this.toParticipantEntity(name));
    //entity.availabilities = [];

    return entity
  }
}
