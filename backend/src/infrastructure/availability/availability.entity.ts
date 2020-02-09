import {Column, Entity, ManyToOne, OneToMany, PrimaryColumn} from 'typeorm';
import {EventEntity} from '../event/event.entity';
import {ParticipantEntity} from '../participant/participant.entity';
import {Date} from '@meetmore-lib/types';
import {AvailabilityStatus} from '@meetmore-lib/availability/AvailabilityStatus';

@Entity('availability')
export class AvailabilityEntity {
  protected _type  = 'AvailabilityEntity';

  @ManyToOne(type => EventEntity, event => event.availabilities, { primary: true })
  event: EventEntity;

  @ManyToOne(type => ParticipantEntity, participant => participant.availabilities, { primary: true })
  participant: ParticipantEntity;

  @Column()
  date: Date;

  @Column()
  status: AvailabilityStatus;
}