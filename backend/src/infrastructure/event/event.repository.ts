import {EntityRepository, Repository} from 'typeorm';
import {EventEntity} from './event.entitiy';

@EntityRepository(EventEntity)
export class EventRepository extends Repository<EventEntity> {}