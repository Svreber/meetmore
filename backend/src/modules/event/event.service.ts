import {Injectable, NotFoundException} from '@nestjs/common';
import {Event} from '@meetmore-lib/Event';
import {EventAvailabilitiesByParticipant} from '@meetmore-lib/availability/EventAvailabilitiesByParticipant';
import {throwIfUndefined} from '../../core/utils/utils';
import {EventRepository} from '../../infrastructure/event/event.repository';
import {ParticipantRepository} from '../../infrastructure/participant/participant.repository';
import {AvailabilityRepository} from '../../infrastructure/availability/availability.repository';
import {ViewMapper} from '../../infrastructure/mapper/view.mapper';

@Injectable()
export class EventService {

  constructor(private readonly eventRepository: EventRepository,
              private readonly participantRepository: ParticipantRepository,
              private readonly availabilityRepository: AvailabilityRepository,
              private readonly viewMapper: ViewMapper) {
  }

  async getAll(): Promise<Array<Event>> {
    const eventEntities = await this.eventRepository.find();
    return eventEntities.map(eventEntity => this.viewMapper.toEvent(eventEntity));
  }

  async getAvailabilitiesByParticipant(eventId: string, participantId: string): Promise<EventAvailabilitiesByParticipant> {
    const eventEntity = await this.eventRepository.findOne({id: eventId});
    throwIfUndefined(eventEntity, new NotFoundException());

    const participantEntity = await this.participantRepository.findOne({id: participantId});
    throwIfUndefined(participantEntity, new NotFoundException());

    const availabilityEntities = await this.availabilityRepository.find({where: {eventId: eventEntity.id, participantId: participantEntity.id}});
    return this.viewMapper.toEventAvailabilitiesByParticipant(eventEntity, participantEntity, availabilityEntities);
  }
}
