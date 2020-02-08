import { Injectable } from '@nestjs/common';
import {EventCRUD} from '@meetmore-lib/EventCRUD';
import {EventMapper} from './event.mapper';
import {EventRepository} from '../../infrastructure/event/event.repository';
import {ParticipantRepository} from '../../infrastructure/participant/participant.repository';

@Injectable()
export class EventCrudService {

  constructor(private eventMapper: EventMapper,
              private eventRepository: EventRepository,
              private participantRepository: ParticipantRepository) {
  }

  async save(eventCRUD: EventCRUD): Promise<EventCRUD> {
    let eventEntity = this.eventMapper.toEventEntity(eventCRUD);
    eventEntity = await this.eventRepository.save(eventEntity);
    return this.eventMapper.toEventCRUD(eventEntity);
  }

  async getAll(): Promise<Array<EventCRUD>> {
    await this.participantRepository.find();
    const eventEntities = await this.eventRepository.find();
    return eventEntities.map(eventEntity => this.eventMapper.toEventCRUD(eventEntity));
  }
}
