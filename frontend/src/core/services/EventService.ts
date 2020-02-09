import axios from 'axios';
import {plainToClass} from 'class-transformer';
import {ApiService} from '@/core/services/ApiService';
import {EventId, ParticipantId} from '@lib/types';
import {EventAvailabilitiesByParticipant} from '@lib/availability/EventAvailabilitiesByParticipant';
import {DateAvailabilities} from '@lib/availability/types';
// import {Event} from '@lib/Event'
type Event = any;

export class EventService {

  private constructor() {
  }

  static getEvent(id: EventId): Promise<Event> {
    return axios.get<Event>(`${ApiService.API_URL}/event/${id}`)
      .then(response => response.data);
    // .then(eventDto => this.instantiateEvent(eventDto)); // FIXME Fix Event type any
  }

  static getEventAvailabilitiesForParticipant(eventId: EventId, participantId: ParticipantId): Promise<EventAvailabilitiesByParticipant> {
    return axios.get<EventAvailabilitiesByParticipant>(`${ApiService.API_URL}/event/${eventId}/participant/${participantId}`)
      .then(response => response.data);
  }

  static saveEventAvailabilitiesForParticipant(eventId: EventId, participantId: ParticipantId, availabilities: DateAvailabilities): Promise<EventAvailabilitiesByParticipant> {
    return axios.put<EventAvailabilitiesByParticipant>(`${ApiService.API_URL}/event/${eventId}/participant/${participantId}`, availabilities)
      .then(response => response.data);
  }

  static instantiateEvent(eventDto: Partial<Event>): Event {
    return plainToClass(Event, eventDto);
  }
}
