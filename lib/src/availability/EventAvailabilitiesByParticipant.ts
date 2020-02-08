import {Participant} from '../Participant';
import {Date} from '../types';
import {DateAvailability} from './DateAvailability';
import {IsNotEmpty, IsObject} from 'class-validator';

export class EventAvailabilitiesByParticipant {

  @IsObject()
  @IsNotEmpty()
  event: Event;

  @IsObject()
  @IsNotEmpty()
  participant: Participant;

  @IsObject()
  @IsNotEmpty()
  availabilities: Record<Date, DateAvailability>;
}
