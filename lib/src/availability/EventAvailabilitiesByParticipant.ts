import {Participant} from '../Participant';
import {IsNotEmpty, IsObject} from 'class-validator';
import {DateAvailabilities} from './types';

export class EventAvailabilitiesByParticipant {

  @IsObject()
  @IsNotEmpty()
  event: Event;

  @IsObject()
  @IsNotEmpty()
  participant: Participant;

  @IsObject()
  @IsNotEmpty()
  availabilities: DateAvailabilities;
}
