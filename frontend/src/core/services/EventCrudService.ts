import axios from 'axios';
import {plainToClass} from 'class-transformer';
import {ApiService} from '@/core/services/ApiService';
import {EventId} from '@lib/types';
import {EventCRUD} from '@/../../lib/src/EventCRUD';

export class EventCrudService {

  private constructor() {
  }

  static getEvent(id: EventId): Promise<EventCRUD> {
    return axios.get<Partial<EventCRUD>>(`${ApiService.API_URL}/event/crud/${id}`)
      .then(response => response.data)
      .then(eventCrudDto => this.instantiateEvent(eventCrudDto));
  }

  static createEvent(event: EventCRUD): Promise<EventCRUD> {
    return axios.post<Partial<EventCRUD>>(`${ApiService.API_URL}/event/crud`, event)
      .then(response => response.data)
      .then(eventCrudDto => this.instantiateEvent(eventCrudDto));
  }

  static updateEvent(event: EventCRUD): Promise<EventCRUD> {
    return axios.put<Partial<EventCRUD>>(`${ApiService.API_URL}/event/crud`, event)
      .then(response => response.data)
      .then(eventCrudDto => this.instantiateEvent(eventCrudDto));
  }

  static instantiateEvent(eventCrudDto: Partial<EventCRUD>): EventCRUD {
    return plainToClass(EventCRUD, eventCrudDto);
  }
}
