import {Injectable} from '@nestjs/common';
import {ParticipantEntity} from '../../infrastructure/participant/participant.entity';
import {ParticipantRepository} from '../../infrastructure/participant/participant.repository';
import {EntityMapper} from '../../infrastructure/mapper/entity.mapper';

@Injectable()
export class ParticipantService {
  constructor(private readonly participantRepository: ParticipantRepository,
              private readonly entityMapper: EntityMapper) {
  }

  async getParticipantsFromName(participants: Array<string>): Promise<Array<ParticipantEntity>> {
    return await Promise.all(participants.map(async (name) => {
      const participantEntity = await this.participantRepository.findOne({name: name});
      return participantEntity ? participantEntity : this.entityMapper.toParticipantEntity(name);
    }));
  }
}