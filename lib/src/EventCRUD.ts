import {IsArray, ArrayNotEmpty} from 'class-validator';
import {AbstractEvent} from './AbstractEvent';

export class EventCRUD extends AbstractEvent {
  protected _type = 'EventCRUD';

  @IsArray()
  @ArrayNotEmpty()
  participants: Array<string>;
}
