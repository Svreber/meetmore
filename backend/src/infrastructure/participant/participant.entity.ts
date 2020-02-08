import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Participant} from '@meetmore-lib/Participant';
import {EventEntity} from '../event/event.entity';

@Entity('participant')
export class ParticipantEntity extends Participant {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(type => EventEntity, event => event.participants)
  events: Array<EventEntity>;
}