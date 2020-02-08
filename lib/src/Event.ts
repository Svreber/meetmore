import {IsArray, IsNotEmpty, IsUUID} from 'class-validator';
import {AbstractEvent} from './AbstractEvent';
import {Participant} from './Participant';

export class Event extends AbstractEvent {

  @IsUUID()
  id: string;

  @IsArray()
  @IsNotEmpty()
  participants: Array<Participant>;
}
