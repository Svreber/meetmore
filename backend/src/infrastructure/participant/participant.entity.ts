import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {Participant} from '@meetmore-lib/Participant';

@Entity('participant')
export class ParticipantEntity extends Participant {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}