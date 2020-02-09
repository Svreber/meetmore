import {IsString, IsUUID} from 'class-validator';
import {ParticipantId} from './types';

export class Participant {
  protected _type = 'Participant';

  @IsUUID()
  id: ParticipantId;

  @IsString()
  name: string;
}
