import router from '@/config/router';
import {EventId, ParticipantId} from '@lib/types';

export class RouterService {

  private constructor() {
  }

  static goToHome(): void {
    router.push({name: 'home'});
  }

  static goToEventCreation(): void {
    router.push({name: 'eventCreation'});
  }

  static goToEventEdition(eventId: EventId): void {
    router.push({name: 'eventEdition', params: {id: eventId}});
  }

  static goToEventView(eventId: EventId): void {
    router.push({name: 'eventView', params: {id: eventId}});
  }
  
  static goToEventAnswering(eventId: EventId, participantId: ParticipantId): void {
    router.push({name: 'eventAnswering', params: {eventId, participantId}});
  }
}
