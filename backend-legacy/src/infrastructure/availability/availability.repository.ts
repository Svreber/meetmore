import {EntityRepository, Repository} from 'typeorm';
import {MeetmoreConnection} from '../database.provider';
import {AvailabilityEntity} from './availability.entity';

@EntityRepository(AvailabilityEntity)
export class AvailabilityRepository extends Repository<AvailabilityEntity> {
}

export const AvailabilityRepositoryProvider = {
  provide: AvailabilityRepository.name,
  useFactory: (connection: MeetmoreConnection) => connection.getCustomRepository(AvailabilityRepository),
  inject: [MeetmoreConnection]
};