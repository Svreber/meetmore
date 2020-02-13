import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

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
}