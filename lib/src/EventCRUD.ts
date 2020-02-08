import {IsArray, ArrayNotEmpty} from 'class-validator';
import {AbstractEvent} from './AbstractEvent';

export class EventCRUD extends AbstractEvent {

  @IsArray()
  @ArrayNotEmpty()
  participants: Array<string>;
}
