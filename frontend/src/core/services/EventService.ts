import axios from 'axios';
import {plainToClass} from 'class-transformer';
import {ApiService} from '@/core/services/ApiService';
import {EventId} from '@lib/types';
// import {Event} from '@lib/Event'
type Event = any;

export class EventService {

  private constructor() {
  }

  static getEvent(id: EventId): Promise<Event> {
    return axios.get<Event>(`${ApiService.API_URL}/event/${id}`)
      .then(response => response.data)
      .then(eventDto => this.instantiateEvent(eventDto));
  }

  static instantiateEvent(eventDto: Partial<Event>): Event {
    return plainToClass(Event, eventDto);
  }
}
