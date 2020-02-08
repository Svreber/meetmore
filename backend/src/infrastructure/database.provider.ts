import { SnakeNamingStrategy } from '../core/utils/snake-naming-strategy';
import {ParticipantEntity} from './participant/participant.entity';
import {EventEntity} from './event/event.entity';
import {Connection, createConnection} from 'typeorm';

export class MeetmoreConnection extends Connection {
}

// // FIXME info should be in configuration
export const MeetmoreConnectionProvider = {
  provide: MeetmoreConnection.name,
  useFactory: async () => await createConnection({
    name: 'MeetmoreDB',
    type: 'sqlite',
    database: 'meetmore.sqlite3',
    entities: [
      ParticipantEntity,
      EventEntity
    ],
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: true
  })
};
