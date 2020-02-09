import {IsString, IsUUID} from 'class-validator';

export class Participant {
  protected _type = 'Participant';

  @IsUUID()
  id: string;

  @IsString()
  name: string;
}
