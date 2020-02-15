import {Injectable} from '@nestjs/common';
import { EventEntity } from '../event/event.entitiy';
import {EventCRUD} from '@meetmore/lib/EventCRUD';
import {throwIfUndefined} from '../../core/utils';

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
}
