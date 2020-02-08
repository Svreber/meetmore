import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import {AbstractEvent} from '@meetmore-lib/AbstractEvent';
import {ParticipantEntity} from '../participant/participant.entity';

@Entity('event')
export class EventEntity extends AbstractEvent {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  idealRecurrence: number;

  @ManyToMany(type => ParticipantEntity, participant => participant.events, {
    // FIXME: When we will have proper creation of user we won't need it
    cascade: ['insert']
  })
  @JoinTable({name: "join_event_participant"})
  participants: Array<ParticipantEntity>;
}