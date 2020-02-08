import {IsString, IsUUID} from 'class-validator';

export class Participant {

  @IsUUID()
  id: string;

  @IsString()
  name: string;
}
