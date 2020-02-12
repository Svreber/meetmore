import {Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Participant} from '@meetmore-lib/Participant';
import {EventEntity} from '../event/event.entity';
import {AvailabilityEntity} from '../availability/availability.entity';

@Entity('participant')
export class ParticipantEntity extends Participant {
  protected _type = 'ParticipantEntity';

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(type => EventEntity, event => event.participants)
  events: Array<EventEntity>;

  @OneToMany(type => AvailabilityEntity, availability => availability.participant)
  availabilities: Array<AvailabilityEntity>;
}