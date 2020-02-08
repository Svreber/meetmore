import { Injectable } from '@nestjs/common';
import {EventCRUD} from '@meetmore-lib/EventCRUD';

@Injectable()
export class EventCrudService {

  async save(event: EventCRUD) {

  }

  async get(id: string) {
  }
}
