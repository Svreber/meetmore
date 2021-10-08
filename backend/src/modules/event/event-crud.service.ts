import {Injectable, NotFoundException} from '@nestjs/common';
import {EventRepository} from '../../infrastructure/event/event.repository';
import { ViewMapper } from 'src/infrastructure/mapper/view.mapper';
import {throwIfUndefined} from '../../core/utils';
import {EntityMapper} from '../../infrastructure/mapper/entity.mapper';
import {ParticipantService} from '../participant/participant.service';
import { EventCRUD } from '@meetmore/lib';

@Injectable()
export class EventCrudService {
  constructor(private readonly eventRepository: EventRepository,
              private readonly participantService: ParticipantService,
              private readonly viewMapper: ViewMapper,
              private readonly entityMapper: EntityMapper) {}

  async getOne(id: string): Promise<EventCRUD> {
    const entity = await this.eventRepository.findOne(id, {relations: ['participants']});
    throwIfUndefined(entity, new NotFoundException());
    return this.viewMapper.toEventCRUD(entity);
  }

  async getAll(): Promise<Array<EventCRUD>> {
    const entities = await this.eventRepository.find({relations: ['participants']});
    return entities.map(entity => this.viewMapper.toEventCRUD(entity));
  }

  async create(eventCRUD: EventCRUD): Promise<EventCRUD> {
    return this.createOrUpdate(eventCRUD);
  }

  async update(eventId: string, eventCRUD: EventCRUD): Promise<EventCRUD> {
    const oldEntity = await this.eventRepository.findOne(eventId);
    throwIfUndefined(oldEntity, new NotFoundException());

    return this.createOrUpdate(eventCRUD);
  }

  private async createOrUpdate(eventCRUD: EventCRUD): Promise<EventCRUD> {
    const participantEntities = await this.participantService.getParticipantsFromName(eventCRUD.participants);
    let eventEntity = this.entityMapper.toEventEntity(eventCRUD, participantEntities);
    eventEntity = await this.eventRepository.save(eventEntity);
    return this.viewMapper.toEventCRUD(eventEntity);
  }
}
