import {HttpException, Injectable, NotFoundException} from '@nestjs/common';
import {EventRepository} from '../../infrastructure/event/event.repository';
import {EventCRUD} from '@meetmore/lib/EventCRUD';
import { ViewMapper } from 'src/infrastructure/mapper/view.mapper';
import {throwIfUndefined} from '../../core/utils';
import {EntityMapper} from '../../infrastructure/mapper/entity.mapper';

@Injectable()
export class EventCrudService {
  constructor(private readonly eventRepository: EventRepository,
              private readonly viewMapper: ViewMapper,
              private readonly entityMapper: EntityMapper) {}

  async getOne(id: string): Promise<EventCRUD> {
    const entity = await this.eventRepository.findOne(id);
    throwIfUndefined(entity, new NotFoundException());
    return this.viewMapper.toEventCRUD(entity);
  }

  async getAll(): Promise<Array<EventCRUD>> {
    const entities = await this.eventRepository.find();
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
    let eventEntity = this.entityMapper.toEventEntity(eventCRUD);
    eventEntity = await this.eventRepository.save(eventEntity);
    return this.viewMapper.toEventCRUD(eventEntity);
  }
}