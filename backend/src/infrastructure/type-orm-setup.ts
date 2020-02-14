import {TypeOrmModule} from '@nestjs/typeorm';
import {EventEntity} from './event/event.entitiy';
import {EventRepository} from './event/event.repository';
import {SnakeNamingStrategy} from '../core/snake-naming-strategy';

export const TypeOrmForRootAsync = TypeOrmModule.forRootAsync({
  useFactory: () => ({
    name: 'MeetmoreDB',
    type: 'sqlite',
    database: 'meetmore.sqlite3',
    entities: [
      EventEntity
    ],
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: true,
    keepConnectionAlive: true
  })
});

export const TypeOrmForFeature = TypeOrmModule.forFeature([
  EventRepository
]);
