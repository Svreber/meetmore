import router from '@/config/router';
import {EventId} from '~meetmore-lib/types';

export class RouterService {

  private constructor() {
  }

  static goToEventCreation(): void {
    router.push({name: 'eventCreation'});
  }

  static goToEventEdition(eventId: EventId): void {
    router.push({name: 'eventEdition', params: {id: eventId}});
  }
}
