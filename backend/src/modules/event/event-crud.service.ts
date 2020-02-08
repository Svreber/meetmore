import { Injectable } from '@nestjs/common';
import {EventCRUD} from '@meetmore-lib/EventCRUD';

@Injectable()
export class EventCrudService {

  async save(eventCRUD: EventCRUD): Promise<EventCRUD> {
    return eventCRUD
  }
}
