import {IsArray, IsNotEmpty, IsObject, IsUUID} from 'class-validator';
import {AbstractEvent} from './AbstractEvent';
import {Participant} from './Participant';
import {Date} from './types';
import {ParticipantAvailability} from './availability/ParticipantAvailability';
import {EventId} from './types';

export class Event extends AbstractEvent {

  @IsUUID()
  id: EventId;

  @IsArray()
  @IsNotEmpty()
  participants: Array<Participant>;

  @IsObject()
  @IsNotEmpty()
  availabilities: Record<Date, Array<ParticipantAvailability>>;
}
