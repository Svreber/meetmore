import {SnakeNamingStrategy} from '../core/utils/snake-naming-strategy';
import {ParticipantEntity} from './participant/participant.entity';
import {EventEntity} from './event/event.entity';
import {Connection, createConnection, getConnectionManager} from 'typeorm';
import {AvailabilityEntity} from './availability/availability.entity';
import {AlreadyHasActiveConnectionError} from 'typeorm/error/AlreadyHasActiveConnectionError';

const MEETMORE_DB_CONNECTION_NAME = 'MeetmoreDB';

export class MeetmoreConnection extends Connection {
}

// // FIXME info should be in configuration
export const MeetmoreConnectionProvider = {
  provide: MeetmoreConnection.name,
  useFactory: async () => {
    try {
      return await createConnection({
        name: MEETMORE_DB_CONNECTION_NAME,
        type: 'sqlite',
        database: 'meetmore.sqlite3',
        entities: [
          AvailabilityEntity,
          EventEntity,
          ParticipantEntity
        ],
        namingStrategy: new SnakeNamingStrategy(),
        synchronize: true
      });
    } catch (error) {
      // Fix HRM making the server to crash
      if (error instanceof AlreadyHasActiveConnectionError) {
        return getConnectionManager().get(MEETMORE_DB_CONNECTION_NAME);
      }
    }
  }
};
