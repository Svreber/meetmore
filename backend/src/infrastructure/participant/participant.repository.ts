import {EntityRepository, Repository} from 'typeorm';
import {ParticipantEntity} from './participant.entity';

@EntityRepository(ParticipantEntity)
export class ParticipantRepository extends Repository<ParticipantEntity> {}