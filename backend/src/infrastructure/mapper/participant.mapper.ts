import {Injectable} from '@nestjs/common';
import {ParticipantEntity} from '../participant/participant.entity';

@Injectable()
export class ParticipantMapper {

  toEntity(name: string): ParticipantEntity {
    const participantEntity = new ParticipantEntity();
    participantEntity.name = name;
    return participantEntity;
  }
}
