import {Injectable} from '@nestjs/common';
import {EventEntity} from '../../infrastructure/event/event.entitiy';
import {EventRepository} from '../../infrastructure/event/event.repository';

@Injectable()
export class EventService {
  constructor(private readonly eventRepository: EventRepository) {}

  findAll(): Promise<EventEntity[]> {
    return this.eventRepository.find();
  }
}