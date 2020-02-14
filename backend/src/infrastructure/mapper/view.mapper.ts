import {Injectable} from '@nestjs/common';
import { EventEntity } from '../event/event.entitiy';
import {EventCRUD} from '@meetmore/lib/EventCRUD';

@Injectable()
export class ViewMapper {

  toEventCRUD(entity: EventEntity): EventCRUD {
    const view = new EventCRUD();
    // @ts-ignore
    view.id = entity.id;
    view.name = entity.name;
    view.description = entity.description;
    view.idealRecurrence = entity.idealRecurrence;
    // view.participants = entity.participants.map(participantEntity => participantEntity.name);

    return view;
  }
}
