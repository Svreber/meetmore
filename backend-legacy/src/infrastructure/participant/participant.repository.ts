import {EntityRepository, Repository} from 'typeorm';
import {ParticipantEntity} from './participant.entity';
import {MeetmoreConnection} from '../database.provider';

@EntityRepository(ParticipantEntity)
export class ParticipantRepository extends Repository<ParticipantEntity> {
}

export const ParticipantRepositoryProvider = {
  provide: ParticipantRepository.name,
  useFactory: (connection: MeetmoreConnection) => connection.getCustomRepository(ParticipantRepository),
  inject: [MeetmoreConnection]
};