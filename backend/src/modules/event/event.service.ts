import {Injectable, NotFoundException} from '@nestjs/common';
import {EventRepository} from '../../infrastructure/event/event.repository';
import {Event} from '@meetmore/lib/Event';
import {throwIfUndefined} from '../../core/utils';
import {ViewMapper} from '../../infrastructure/mapper/view.mapper';

@Injectable()
export class EventService {
  constructor(private readonly eventRepository: EventRepository,
              private readonly viewMapper: ViewMapper) {}

  async getOne(id: string): Promise<Event> {
    const entity = await this.eventRepository.findOne(id, {relations: ['participants']});
    throwIfUndefined(entity, new NotFoundException());

    return this.viewMapper.toEvent(entity);
  }

  async getAll(): Promise<Array<Event>> {
    const entities = await this.eventRepository.find({relations: ['participants']});
    return entities.map(entity => this.viewMapper.toEvent(entity));
  }
}