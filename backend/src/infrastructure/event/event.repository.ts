import {EntityRepository, Repository} from 'typeorm';
import {EventEntity} from './event.entity';
import {MeetmoreConnection} from '../database.provider';

@EntityRepository(EventEntity)
export class EventRepository extends Repository<EventEntity> {
}

export const EventRepositoryProvider = {
  provide: EventRepository.name,
  useFactory: (connection: MeetmoreConnection) => connection.getCustomRepository(EventRepository),
  inject: [MeetmoreConnection]
};