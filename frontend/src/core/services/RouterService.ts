import router from '@/config/router';
import {EventId} from '@lib/types';

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
}
