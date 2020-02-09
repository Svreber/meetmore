import {Injectable, NotFoundException} from '@nestjs/common';
import {EventCRUD} from '@meetmore-lib/EventCRUD';
import {EventRepository} from '../../infrastructure/event/event.repository';
import {ParticipantRepository} from '../../infrastructure/participant/participant.repository';
import {throwIfUndefined} from '../../core/utils/utils';
import {ViewMapper} from '../../infrastructure/mapper/view.mapper';
import {EntityMapper} from '../../infrastructure/mapper/entity.mapper';

@Injectable()
export class EventCrudService {

  constructor(private readonly eventRepository: EventRepository,
              private readonly participantRepository: ParticipantRepository,
              private readonly viewMapper: ViewMapper,
              private readonly entityMapper: EntityMapper) {
  }

  async save(eventCRUD: EventCRUD): Promise<EventCRUD> {
    let eventEntity = this.entityMapper.toEventEntity(eventCRUD);
    eventEntity = await this.eventRepository.save(eventEntity);
    return this.viewMapper.toEventCRUD(eventEntity);
  }

  async update(eventCRUD: EventCRUD): Promise<EventCRUD> {
    const oldEntity = await this.eventRepository.findOne(eventCRUD.id, {relations: ['participants']});
    throwIfUndefined(oldEntity, new NotFoundException());
    const newEntity = this.entityMapper.toEventEntity(eventCRUD);

    const participants = await Promise.all(eventCRUD.participants.map(async (name) => {
      const participantEntity = await this.participantRepository.findOne({name: name});
      return participantEntity ? participantEntity : this.entityMapper.toParticipantEntity(name);
    }));

    const updatedEntity = Object.assign(oldEntity, newEntity);
    updatedEntity.participants = participants;

    const savedEntity = await this.eventRepository.save(updatedEntity);
    return this.viewMapper.toEventCRUD(savedEntity);
  }

  async getAll(): Promise<Array<EventCRUD>> {
    await this.participantRepository.find();
    const eventEntities = await this.eventRepository.find({relations: ['participants']});
    return eventEntities.map(eventEntity => this.viewMapper.toEventCRUD(eventEntity));
  }

  async getOne(id: string): Promise<EventCRUD> {
    const eventEntity = await this.eventRepository.findOne(id, {relations: ['participants']});
    throwIfUndefined(eventEntity, new NotFoundException());
    return this.viewMapper.toEventCRUD(eventEntity);
  }
}
