import { Injectable } from '@nestjs/common';
import {EventCRUD} from '@meetmore-lib/EventCRUD';
import {EventMapper} from './event.mapper';
import {Event} from '@meetmore-lib/Event';

@Injectable()
export class EventCrudService {

  events: Array<Event> = [];

  constructor(private eventMapper: EventMapper) {
  }

  async save(eventCRUD: EventCRUD): Promise<EventCRUD> {
    const event = this.eventMapper.toEvent(eventCRUD);
    this.events.push(event);
    // If no id => Create Event + add id
    // If id => get Event from id, update it => save


    return this.eventMapper.toEventCRUD(event);
  }

  async getAll(): Promise<Array<EventCRUD>> {
    return this.events.map(event => this.eventMapper.toEventCRUD(event));
  }
}
