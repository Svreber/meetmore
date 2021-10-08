import {Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {ParticipantEntity} from '../participant/participant.entity';
import {EventEntity} from '../event/event.entitiy';
import { AvailabilityStatus } from '@meetmore/lib';

@Entity('availability')
export class AvailabilityEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()

  @ManyToOne(type => EventEntity, event => event.availabilities, { primary: true })
  event: EventEntity;

  @ManyToOne(type => ParticipantEntity, participant => participant.availabilities, { primary: true })
  participant: ParticipantEntity;

  @Column()
  date: Date;

  @Column()
  status: AvailabilityStatus;
}