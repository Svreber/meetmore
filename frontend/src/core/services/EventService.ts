import axios from 'axios';
import {plainToClass} from 'class-transformer';
import {EventCRUD} from '../../../../lib/src/EventCRUD';
import {EventId} from '@meetmore-lib/types';

export class EventService {

  static API_URL: string = 'http://localhost:3000';

  private constructor() {
  }

  static getEvent(id: EventId): Promise<EventCRUD> {
    return axios.get<Partial<EventCRUD>>(`${this.API_URL}/event/${id}`)
      .then(response => response.data)
      .then(eventCrudDto => this.instantiateEvent(eventCrudDto));
  }

  static createEvent(event: EventCRUD): Promise<EventCRUD> {
    return axios.post<Partial<EventCRUD>>(`${this.API_URL}/event/crud`, event)
      .then(response => response.data)
      .then(eventCrudDto => this.instantiateEvent(eventCrudDto));
  }

  static instantiateEvent(eventCrudDto: Partial<EventCRUD>): EventCRUD {
    return plainToClass(EventCRUD, eventCrudDto);
  }
}
