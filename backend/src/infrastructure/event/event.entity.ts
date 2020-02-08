import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {AbstractEvent} from '@meetmore-lib/AbstractEvent';

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
}