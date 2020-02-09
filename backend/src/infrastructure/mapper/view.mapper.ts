import {Injectable} from '@nestjs/common';
import {EventEntity} from '../event/event.entity';
import {EventCRUD} from '@meetmore-lib/EventCRUD';
import {Event} from '@meetmore-lib/Event';
import * as _ from 'lodash';
import {ParticipantEntity} from '../participant/participant.entity';
import {Participant} from '@meetmore-lib/Participant';
import {AvailabilityEntity} from '../availability/availability.entity';
import {ParticipantAvailability} from '@meetmore-lib/availability/ParticipantAvailability';
import {DateAvailability} from '@meetmore-lib/availability/DateAvailability';
import {EventAvailabilitiesByParticipant} from '@meetmore-lib/availability/EventAvailabilitiesByParticipant';

@Injectable()
export class ViewMapper {

  toEventCRUD(entity: EventEntity): EventCRUD {
    const view = new EventCRUD();
    view.id = entity.id;
    view.name = entity.name;
    view.description = entity.description;
    view.idealRecurrence = entity.idealRecurrence;
    view.participants = entity.participants.map(participantEntity => participantEntity.name);

    return view;
  }

  toEvent(entity: EventEntity): Event {
    const view = new Event();
    view.id = entity.id;
    view.name = entity.name;
    view.description = entity.description;
    view.idealRecurrence = entity.idealRecurrence;
    view.participants = entity.participants.map(participantEntity => this.toParticipant(participantEntity));
    view.availabilities = _(entity.availabilities)
      .groupBy(availability => availability.date)
      .mapValues((availabilities) => availabilities.map(availabilityEntity => this.toParticipantAvailability(availabilityEntity)))
      .value();
    return view;
  }

  toParticipant(entity: ParticipantEntity): Participant {
    const view = new Participant();
    view.id = entity.id;
    view.name = entity.name;
    return view;
  }

  toParticipantAvailability(entity: AvailabilityEntity): ParticipantAvailability {
    const view = new ParticipantAvailability();
    view.participant = entity.participant;
    view.status = entity.status;
    return view;
  }

  toDateAvailability(entity: AvailabilityEntity): DateAvailability {
    const view = new DateAvailability();
    view.date = entity.date;
    view.status = entity.status;
    return view;
  }

  toEventAvailabilitiesByParticipant(eventEntity: EventEntity, participantEntity: ParticipantEntity, availabilityEntities: Array<AvailabilityEntity>): EventAvailabilitiesByParticipant {
    const view = new EventAvailabilitiesByParticipant();
    view.event = this.toEvent(eventEntity);
    view.participant = this.toParticipant(participantEntity);
    view.availabilities = _.reduce(availabilityEntities, (availabilityViews, availabilityEntity) => {
      availabilityViews[availabilityEntity.date] = this.toDateAvailability(availabilityEntity);
      return availabilityViews;
    }, {});
    return view;
  }
}
