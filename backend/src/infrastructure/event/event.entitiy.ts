import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {ParticipantEntity} from '../participant/participant.entity';
import {AvailabilityEntity} from '../availability/availability.entity';

@Entity('event')
export class EventEntity {
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

  @OneToMany(type => AvailabilityEntity, availability => availability.event)
  availabilities: Array<AvailabilityEntity>;
}