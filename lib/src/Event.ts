import {IsArray, IsNotEmpty, IsObject, IsUUID} from 'class-validator';
import {AbstractEvent} from './AbstractEvent';
import {Participant} from './Participant';
import {Date} from './types';
import {ParticipantAvailability} from './availability/ParticipantAvailability';

export class Event extends AbstractEvent {

  @IsUUID()
  id: string;

  @IsArray()
  @IsNotEmpty()
  participants: Array<Participant>;

  @IsObject()
  @IsNotEmpty()
  availabilities: Record<Date, Array<ParticipantAvailability>>;
}
