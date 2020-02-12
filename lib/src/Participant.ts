import {IsString, IsUUID} from 'class-validator';
import {ParticipantId} from './types';

export class Participant {
  protected __nominal: void;

  @IsUUID()
  id: ParticipantId;

  @IsString()
  name: string;
}
