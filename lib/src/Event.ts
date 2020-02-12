import {IsArray, IsNotEmpty, IsObject, IsUUID} from 'class-validator';
import {AbstractEvent} from './AbstractEvent';
import {Participant} from './Participant';
import {EventId} from './types';
import {ParticipantsAvailabilities} from './availability/types';

export class Event extends AbstractEvent {
  protected __nominal: void;

  @IsUUID()
  id: EventId;

  @IsArray()
  @IsNotEmpty()
  participants: Array<Participant>;

  @IsObject()
  @IsNotEmpty()
  availabilities: ParticipantsAvailabilities;
}
