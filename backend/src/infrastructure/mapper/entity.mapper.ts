import {Injectable} from '@nestjs/common';
import {EventCRUD} from '@meetmore-lib/EventCRUD';
import {EventEntity} from '../event/event.entity';
import {ParticipantEntity} from '../participant/participant.entity';
import {DateAvailabilities} from '@meetmore-lib/availability/types';
import {AvailabilityEntity} from '../availability/availability.entity';
import * as _ from 'lodash';

@Injectable()
export class EntityMapper {
  toEventEntity(view: EventCRUD): EventEntity {
    const entity = new EventEntity();
    entity.name = view.name;
    entity.description = view.description;
    entity.idealRecurrence = view.idealRecurrence;
    entity.participants = view.participants.map(name => this.toParticipantEntity(name));
    entity.availabilities = [];

    return entity
  }

  toParticipantEntity(name: string): ParticipantEntity {
    const entity = new ParticipantEntity();
    entity.name = name;
    return entity;
  }

  toAvailabilityEntities(eventEntity: EventEntity, participantEntity: ParticipantEntity, dateAvailabilities: DateAvailabilities): Array<AvailabilityEntity> {
    return _.map(dateAvailabilities, (dateAvailability) => {
      const availability = new AvailabilityEntity();
      availability.event = eventEntity;
      availability.participant = participantEntity;
      availability.date = dateAvailability.date;
      availability.status = dateAvailability.status;
      return availability;
    });
  }
}
