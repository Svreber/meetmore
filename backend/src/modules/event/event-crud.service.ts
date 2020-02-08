import {Injectable, NotFoundException} from '@nestjs/common';
import {EventCRUD} from '@meetmore-lib/EventCRUD';
import {EventRepository} from '../../infrastructure/event/event.repository';
import {ParticipantRepository} from '../../infrastructure/participant/participant.repository';
import {throwIfUndefined} from '../../core/utils/utils';
import {EventMapper} from '../../infrastructure/mapper/event.mapper';

@Injectable()
export class EventCrudService {

  constructor(private readonly eventMapper: EventMapper,
              private readonly eventRepository: EventRepository,
              private readonly participantRepository: ParticipantRepository) {
  }

  async save(eventCRUD: EventCRUD): Promise<EventCRUD> {
    let eventEntity = this.eventMapper.toEntity(eventCRUD);
    eventEntity = await this.eventRepository.save(eventEntity);
    return this.eventMapper.toCRUD(eventEntity);
  }

  async getAll(): Promise<Array<EventCRUD>> {
    await this.participantRepository.find();
    const eventEntities = await this.eventRepository.find({relations: ['participants']});
    return eventEntities.map(eventEntity => this.eventMapper.toCRUD(eventEntity));
  }

  async getOne(id: string): Promise<EventCRUD> {
    const eventEntity = await this.eventRepository.findOne({id: id}, {relations: ['participants']});
    throwIfUndefined(eventEntity, new NotFoundException());
    return this.eventMapper.toCRUD(eventEntity);
  }
}
