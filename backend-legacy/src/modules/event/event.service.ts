import {Injectable, NotFoundException} from '@nestjs/common';
import {Event} from '@meetmore-lib/Event';
import {EventAvailabilitiesByParticipant} from '@meetmore-lib/availability/EventAvailabilitiesByParticipant';
import {throwIfUndefined} from '../../core/utils/utils';
import {EventRepository} from '../../infrastructure/event/event.repository';
import {ParticipantRepository} from '../../infrastructure/participant/participant.repository';
import {AvailabilityRepository} from '../../infrastructure/availability/availability.repository';
import {ViewMapper} from '../../infrastructure/mapper/view.mapper';
import {DateAvailabilities} from '@meetmore-lib/availability/types';
import {EntityMapper} from '../../infrastructure/mapper/entity.mapper';

@Injectable()
export class EventService {

  constructor(private readonly eventRepository: EventRepository,
              private readonly participantRepository: ParticipantRepository,
              private readonly availabilityRepository: AvailabilityRepository,
              private readonly viewMapper: ViewMapper,
              private readonly entityMapper: EntityMapper) {
  }

  async getOne(eventId: string): Promise<Event> {
    const entity = await this.eventRepository.findOne(eventId, {relations: ['participants', 'availabilities']});
    throwIfUndefined(entity, new NotFoundException());
    return this.viewMapper.toEvent(entity);
  }

  async getAll(): Promise<Array<Event>> {
    const eventEntities = await this.eventRepository.find();
    return eventEntities.map(eventEntity => this.viewMapper.toEvent(eventEntity));
  }

  async getAvailabilitiesByParticipant(eventId: string, participantId: string): Promise<EventAvailabilitiesByParticipant> {
    const eventEntity = await this.eventRepository.findOne( eventId, {relations: ['participants', 'availabilities', 'availabilities.participant']});
    throwIfUndefined(eventEntity, new NotFoundException());

    const participantEntity = await this.participantRepository.findOne(participantId);
    throwIfUndefined(participantEntity, new NotFoundException());

    const availabilityEntities = await this.availabilityRepository.find({where: {eventId: eventEntity.id, participantId: participantEntity.id}});
    return this.viewMapper.toEventAvailabilitiesByParticipant(eventEntity, participantEntity, availabilityEntities);
  }

  async eraseAvailabilitiesBy(eventId: string, participantId: string, dateAvailabilities: DateAvailabilities): Promise<EventAvailabilitiesByParticipant> {
    const oldAvailabilityEntities = await this.availabilityRepository.find({where: {eventId: eventId, participantId: participantId}, relations: ['event', 'participant']});
    await this.availabilityRepository.remove(oldAvailabilityEntities);

    const eventEntity = await this.eventRepository.findOne(eventId);
    throwIfUndefined(eventEntity, new NotFoundException());

    const participantEntity = await this.participantRepository.findOne(participantId);
    throwIfUndefined(participantEntity, new NotFoundException());

    const newAvailabilityEntities = this.entityMapper.toAvailabilityEntities(eventEntity, participantEntity, dateAvailabilities);
    await this.availabilityRepository.save(newAvailabilityEntities);

    return this.getAvailabilitiesByParticipant(eventId, participantId);
  }
}
