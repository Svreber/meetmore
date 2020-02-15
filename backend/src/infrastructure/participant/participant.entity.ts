import {Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {EventEntity} from '../event/event.entitiy';

@Entity('participant')
export class ParticipantEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(type => EventEntity, event => event.participants)
  events: Array<EventEntity>;
}