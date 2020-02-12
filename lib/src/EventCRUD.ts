import {IsArray, ArrayNotEmpty} from 'class-validator';
import {AbstractEvent} from './AbstractEvent';

export class EventCRUD extends AbstractEvent {
  protected __nominal: void;

  @IsArray()
  @ArrayNotEmpty()
  participants: Array<string>;
}
