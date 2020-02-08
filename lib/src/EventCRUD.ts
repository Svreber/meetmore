import {IsArray, IsNotEmpty} from 'class-validator';
import {AbstractEvent} from './AbstractEvent';

export class EventCRUD extends AbstractEvent {

  @IsArray()
  @IsNotEmpty()
  participants: Array<string>;
}
