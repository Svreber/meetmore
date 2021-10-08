import {Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {EventEntity} from '../event/event.entitiy';
import {AvailabilityEntity} from '../availability/availability.entity';

@Entity('participant')
export class ParticipantEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(type => EventEntity, event => event.participants)
  events: Array<EventEntity>;

  @OneToMany(type => AvailabilityEntity, availability => availability.participant)
  availabilities: Array<AvailabilityEntity>;
}