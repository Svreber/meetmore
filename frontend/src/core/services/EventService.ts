import axios from 'axios';
import {plainToClass} from 'class-transformer';
import {EventCRUD} from '../../../../lib/src/EventCRUD';

export class EventService {

  static API_URL: string = 'http://localhost:3000';

  private constructor() {
  }

  static createEvent(event: EventCRUD): Promise<EventCRUD> {
    return axios.post<Partial<EventCRUD>>(`${this.API_URL}/event/crud`, event)
      .then(response => response.data)
      .then(eventCrudDto => plainToClass(EventCRUD, eventCrudDto, {excludeExtraneousValues: true}));
  }
}
